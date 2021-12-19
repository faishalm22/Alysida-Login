package repository

import (
	"context"
	"database/sql"
	"shadelx-be-usermgmt/datastruct"

	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/log/level"
)

type repo struct {
	db     *sql.DB
	logger log.Logger
}

// NewRepo handle all db operation
func NewRepo(db *sql.DB, logger log.Logger) datastruct.DBRepository {
	return &repo{
		db:     db,
		logger: log.With(logger, "repo", "postgres"),
	}
}

const (
	queryGetUserByEmail         = "SELECT * FROM tbl_mstr_user WHERE email=$1 LIMIT 1;"
	queryGetUserByUsername      = "SELECT * FROM tbl_mstr_user WHERE username=$1 LIMIT 1;"
	queryEmailIsExists          = "SELECT EXISTS(SELECT 1 FROM tbl_mstr_user WHERE email=$1);"
	queryUsernameIsExists       = "SELECT EXISTS(SELECT 1 FROM tbl_mstr_user WHERE username=$1);"
	queryStoreOTP               = "INSERT INTO tbl_trx_verification_email(email, code, expires_at) VALUES($1, $2, $3)"
	queryGetVerificationData    = "SELECT email, code, expires_at FROM tbl_trx_verification_email WHERE email = $1 ORDER BY expires_at LIMIT 1"
	queryUpdatePassword         = "UPDATE tbl_mstr_user SET password = $1, token_hash = $2 WHERE email = $3"
	queryDeleteVerificationData = "DELETE FROM tbl_trx_verification_email WHERE email = $1 AND type = $2"
)

// GetUserByEmail retrieves the user object having the given email, else returns error
func (repo *repo) GetUserByEmail(ctx context.Context, email string) (*datastruct.UserInformation, error) {

	level.Debug(repo.logger).Log("msg", "start GetUserByEmail", "email", email)

	var user datastruct.UserInformation
	err := repo.db.QueryRowContext(ctx, queryGetUserByEmail, email).Scan(
		&user.UserID,
		&user.Username,
		&user.Email,
		&user.Name,
		&user.Phonenumber,
		&user.Password,
		&user.CreatedDate,
		&user.UpdatedDate,
		&user.Email_verified,
		&user.Image_file,
		&user.Identity_type,
		&user.Identity_no,
		&user.Address_ktp,
		&user.Domisili,
		&user.TokenHash,
	)
	if err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return nil, err
	}

	level.Debug(repo.logger).Log("msg", "finish GetUserByEmail")

	return &user, nil
}

// GetUserByUsername retrieves the user object having the given usernmae, else returns error
func (repo *repo) GetUserByUsername(ctx context.Context, username string) (*datastruct.UserInformation, error) {

	level.Debug(repo.logger).Log("msg", "start run GetUserByUsername", "user", username)

	var user datastruct.UserInformation
	err := repo.db.QueryRowContext(ctx, queryGetUserByUsername, username).Scan(
		&user.UserID,
		&user.Username,
		&user.Email,
		&user.Name,
		&user.Phonenumber,
		&user.Password,
		&user.CreatedDate,
		&user.UpdatedDate,
		&user.Email_verified,
		&user.Image_file,
		&user.Identity_type,
		&user.Identity_no,
		&user.Address_ktp,
		&user.Domisili,
		&user.TokenHash,
	)
	if err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return nil, err
	}

	level.Debug(repo.logger).Log("msg", "finish GetUserByUsername")

	return &user, nil
}

// CreateOTP inserts the OTP code into the database
func (repo *repo) CreateOTP(ctx context.Context, data *datastruct.VerificationData) error {

	level.Debug(repo.logger).Log("msg", "start run CreateVerificationData")

	_, err := repo.db.ExecContext(
		ctx,
		queryStoreOTP,
		data.Email,
		data.Code,
		data.ExpiresAt,
	)
	if err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return err
	}

	level.Debug(repo.logger).Log("msg", "finish CreateVerificationData")

	return nil
}

// GetVerificationData retrieves the stored verification code.
func (repo *repo) GetVerificationData(ctx context.Context, email string) (*datastruct.VerificationData, error) {

	level.Debug(repo.logger).Log("msg", "start run GetVerificationData")

	var verificationData datastruct.VerificationData
	err := repo.db.QueryRowContext(ctx, queryGetVerificationData, email).Scan(
		&verificationData.Email,
		&verificationData.Code,
		&verificationData.ExpiresAt,
		//&verificationData.Type,
	)
	if err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return nil, err
	}

	level.Debug(repo.logger).Log("msg", "finish GetVerificationData")

	return &verificationData, nil
}

// EmailIsExist use to check if email is exist
func (repo *repo) EmailIsExist(ctx context.Context, email string) (bool, error) {

	level.Debug(repo.logger).Log("msg", "start run EmailIsExist")

	var exists bool
	if err := repo.db.QueryRow(queryEmailIsExists, email).Scan(&exists); err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return false, nil
	}

	level.Debug(repo.logger).Log("msg", "finish EmailIsExist")
	return exists, nil
}

// UsernameIsExist use to check if username is existeck
func (repo *repo) UsernameIsExist(ctx context.Context, username string) (bool, error) {

	level.Debug(repo.logger).Log("msg", "start run UsernameIsExist")

	var exists bool
	if err := repo.db.QueryRow(queryUsernameIsExists, username).Scan(&exists); err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return false, err
	}

	level.Debug(repo.logger).Log("msg", "finish EmailIsExist")

	return exists, nil
}

// UpdateUserPassword updates the user password
func (repo *repo) UpdateUserPassword(ctx context.Context, email string, password string, tokenHash string) error {

	level.Debug(repo.logger).Log("msg", "start run UpdateUserPassword")

	_, err := repo.db.ExecContext(ctx, queryUpdatePassword, password, tokenHash, email)
	if err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return err
	}

	level.Debug(repo.logger).Log("msg", "finish UpdateUserPassword")

	return nil
}

// DeleteVerificationData deletes a used verification data
func (repo *repo) DeleteVerificationData(ctx context.Context, verificationData *datastruct.VerificationData) error {

	level.Debug(repo.logger).Log("msg", "start run DeleteVerificationData")

	_, err := repo.db.ExecContext(
		ctx,
		queryDeleteVerificationData,
		verificationData.Email,
	)
	if err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return err
	}

	level.Debug(repo.logger).Log("msg", "finish DeleteVerificationData")

	return nil
}
