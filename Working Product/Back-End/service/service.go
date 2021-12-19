package service

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/log/level"

	"shadelx-be-usermgmt/datastruct"
	"shadelx-be-usermgmt/service/pkg/jwt"
	"shadelx-be-usermgmt/util"
)

type (
	Service interface {
		Login(ctx context.Context, usernmae string, password string) (*datastruct.UserInformation, map[string]string, error)
		UsernameAvailability(ctx context.Context, identity string) (string, error)
		EmailAvailability(ctx context.Context, identity string) (string, error)
		RefreshToken(ctx context.Context, identity, customKey string) (string, error)
		GetOTP(ctx context.Context, usernmae string) (bool, error)
		VerifyOTP(ctx context.Context, identity, code string) (bool, string, error)
		ResetPassword(ctx context.Context, identity, code, password, passwordRe string) error
	}

	service struct {
		repository datastruct.DBRepository
		configs    *util.Configurations
		logger     log.Logger
	}
)

// NewService ...
func NewService(repo datastruct.DBRepository, configs *util.Configurations, logger log.Logger) Service {
	return &service{
		repository: repo,
		configs:    configs,
		logger:     log.With(logger, "repo", "service"),
	}
}

//Login
func (s *service) Login(ctx context.Context, identity string, password string) (*datastruct.UserInformation, map[string]string, error) {

	var err error
	var user *datastruct.UserInformation

	if strings.Contains(identity, "@") {
		user, err = s.repository.GetUserByEmail(ctx, identity)
		if err != nil && err == sql.ErrNoRows {
			return nil, nil, errors.New(util.ErrInvalidUsernameEmail)
		}

		if err != nil {
			level.Error(s.logger).Log("err", err)
			return nil, nil, err
		}
	} else {
		user, err = s.repository.GetUserByUsername(ctx, identity)
		if err != nil && err == sql.ErrNoRows {
			return nil, nil, errors.New(util.ErrInvalidUsernameEmail)
		}
		if err != nil {
			level.Error(s.logger).Log("err", err)
			return nil, nil, err
		}
	}

	if !user.Email_verified {
		return nil, nil, errors.New(util.ErrEmailUnverified)
	}

	//membandingkan password yg diinputkan dengan yg ada di database
	if err := util.PasswordCompare(user.Password, password); err != nil {
		fmt.Println(err)
		return nil, nil, errors.New(util.ErrInvalidPassword)
	}

	accessToken, err := jwt.GenerateAccessToken(fmt.Sprint(user.UserID), int64(s.configs.JwtExpiration), s.configs.JwtSecret)
	if err != nil {
		level.Error(s.logger).Log("msg", "unable to generate access token", "err", err)
		return nil, nil, errors.New(util.ErrLoginToken)
	}

	custKey := jwt.CreateCustomKey(user.TokenHash, fmt.Sprint(user.UserID))

	refreshToken, err := jwt.GenerateRefreshToken(fmt.Sprint(user.UserID), custKey, s.configs.JwtSecret)
	if err != nil {
		level.Error(s.logger).Log("msg", "unable to generate refresh token", "err", err)
		return nil, nil, errors.New(util.ErrLoginToken)
	}

	token := make(map[string]string)
	token["access_token"] = accessToken
	token["refresh_token"] = refreshToken

	return user, token, nil
}

//cek username
func (s *service) UsernameAvailability(ctx context.Context, username string) (string, error) {
	isExist, err := s.repository.UsernameIsExist(ctx, username)
	if err != nil {
		level.Error(s.logger).Log("msg", "unable check usernmae availability", "err", err)
		return "", errors.New(util.ErrDBPostgre)
	}
	if isExist && err == nil {
		return "", errors.New(util.ErrUsernameAvailability)
	}
	return util.MsgUserAvail, nil
}

//cek email
func (s *service) EmailAvailability(ctx context.Context, email string) (string, error) {
	isExist, err := s.repository.EmailIsExist(ctx, email)
	if err != nil {
		level.Error(s.logger).Log("msg", "unable check email availability", "err", err)
		return "", err
	}
	if isExist && err == nil {
		return "", errors.New(util.ErrEmailAvailability)
	}
	return util.MsgEmailAvail, nil
}

//refresh token
func (s *service) RefreshToken(ctx context.Context, identity, customKey string) (string, error) {
	user, err := s.repository.GetUserByUsername(ctx, identity)
	if err != nil {
		return "", err
	}

	getCustomKey := jwt.CreateCustomKey(user.TokenHash, fmt.Sprint(user.UserID))

	actualCustomKey := jwt.GenerateCustomKey(getCustomKey)

	level.Debug(s.logger).Log("actual", actualCustomKey, "get", customKey)

	if customKey != actualCustomKey {
		return "", errors.New(util.ErrUnauthorized)
	}

	token, err := jwt.GenerateAccessToken(fmt.Sprint(user.UserID), int64(s.configs.JwtExpiration), s.configs.JwtSecret)
	if err != nil {
		return "", errors.New(util.ErrGenerateToken)
	}

	return token, nil
}

//Get OTP
func (s *service) GetOTP(ctx context.Context, identity string) (bool, error) {

	var err error
	var user *datastruct.UserInformation

	if strings.Contains(identity, "@") {
		user, err = s.repository.GetUserByEmail(ctx, identity)
		if err != nil && err == sql.ErrNoRows {
			return false, errors.New(util.ErrInvalidUsernameEmail)
		}

		if err != nil {
			level.Error(s.logger).Log("err", err)
			return false, err
		}
	} else {
		user, err = s.repository.GetUserByUsername(ctx, identity)
		if err != nil && err == sql.ErrNoRows {
			return false, errors.New(util.ErrInvalidUsernameEmail)
		}
		if err != nil {
			level.Error(s.logger).Log("err", err)
			return false, err
		}
	}

	code, err := util.GenerateRandom4Digits()
	if err != nil {
		return false, errors.New(util.ErrGenerateOTP)
	}

	verificationData := &datastruct.VerificationData{
		Email:     user.Email,
		Code:      fmt.Sprint(code),
		ExpiresAt: time.Now().Add(time.Minute * time.Duration(30)),
	}

	sendEmail(user.Email, user.Username, code)

	if err = s.repository.CreateOTP(ctx, verificationData); err != nil {
		level.Error(s.logger).Log("err", err.Error())
		return false, errors.New(util.ErrDBPostgre)
	}
	return true, nil
}

//Verifikasi OTP
func (s *service) VerifyOTP(ctx context.Context, identity string, code string) (bool, string, error) {
	var user *datastruct.UserInformation
	var actualVerificationData *datastruct.VerificationData
	var verificationData datastruct.VerificationData

	var err error
	if strings.Contains(identity, "@") {
		user, err = s.repository.GetUserByEmail(ctx, identity)
		if err != nil && err == sql.ErrNoRows {
			return false, "", errors.New(util.ErrInvalidUsernameEmail)
		}

		if err != nil {
			level.Error(s.logger).Log("err", err)
			return false, "", err
		}
	} else {
		user, err = s.repository.GetUserByUsername(ctx, identity)
		if err != nil && err == sql.ErrNoRows {
			return false, "", errors.New(util.ErrInvalidUsernameEmail)
		}
		if err != nil {
			level.Error(s.logger).Log("err", err)
			return false, "", err
		}
	}

	verificationData.Code = code
	verificationData.Email = user.Email
	//verificationData.Type = datastruct.VerificationDataType(2)
	actualVerificationData, err = s.repository.GetVerificationData(ctx, user.Email)
	if err != nil {
		level.Error(s.logger).Log("err", err)
		return false, "", err
	}

	_, err = verifyCode(actualVerificationData, verificationData)
	if err != nil {
		level.Error(s.logger).Log("err", err)
		return false, "", err
	}

	return true, code, nil
}

//cek kode otp yg diinputkan dengan yg ada di database dan
//cek kadaluarsa kode otp
func verifyCode(actualVerificationData *datastruct.VerificationData, verificationData datastruct.VerificationData) (bool, error) {

	// check for expiration
	if actualVerificationData.ExpiresAt.Before(time.Now()) {
		return false, errors.New(util.ErrPasswordResetCodeExpired)
	}

	if actualVerificationData.Code != verificationData.Code {
		return false, errors.New(util.ErrPasswordResetCodeInvalid)
	}

	return true, nil
}

func (s *service) ResetPassword(ctx context.Context, identity, password, passwordRe, code string) error {

	var user *datastruct.UserInformation
	var actualVerificationData *datastruct.VerificationData
	var verificationData datastruct.VerificationData
	var err error

	if strings.Contains(identity, "@") {
		user, err = s.repository.GetUserByEmail(ctx, identity)
		if err != nil {
			level.Error(s.logger).Log("err", err.Error())
			return err
		}
	} else {
		user, err = s.repository.GetUserByUsername(ctx, identity)
		if err != nil {
			level.Error(s.logger).Log("err", err.Error())
			return err
		}
	}

	verificationData.Code = code
	verificationData.Email = user.Email
	actualVerificationData, err = s.repository.GetVerificationData(ctx, user.Email)
	if err != nil {
		level.Error(s.logger).Log("err", err.Error())
		return err
	}

	// fmt.Println(actualVerificationData.Code)
	// fmt.Println(verificationData.Code)
	_, err = verifyCode(actualVerificationData, verificationData)
	if err != nil {
		level.Error(s.logger).Log("err", err.Error())
		return err
	}

	if password != passwordRe {
		level.Error(s.logger).Log("err", util.ErrPassordNotMatched)
		return errors.New(util.ErrPassordNotMatched)
	}

	hashedPass, err := util.PasswordHashing(password)
	if err != nil {
		level.Error(s.logger).Log("err", err.Error())
		return err
	}

	tokenHash := util.GenerateRandomString(15)

	if err := s.repository.UpdateUserPassword(ctx, user.Email, hashedPass, tokenHash); err != nil {
		level.Error(s.logger).Log("err", err.Error())
		return errors.New(util.ErrDBPostgre)
	}

	if err = s.repository.DeleteVerificationData(ctx, actualVerificationData); err != nil {
		level.Error(s.logger).Log("err", err.Error())
		return errors.New(util.ErrDBPostgre)
	}
	return nil
}
