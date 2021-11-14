package service

import (
	"context"
	"database/sql"

	"errors"
	"fmt"
	"strings"

	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/log/level"

	"shadelx-be-usermgmt/datastruct"
	"shadelx-be-usermgmt/util"
)

type (
	Service interface {
		Login(ctx context.Context, usernmae string, password string) (*datastruct.UserInformation, error)
		UsernameAvailability(ctx context.Context, identity string) (string, error)
		EmailAvailability(ctx context.Context, identity string) (string, error)
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

func (s *service) Login(ctx context.Context, identity string, password string) (*datastruct.UserInformation, error) {

	var err error
	var user *datastruct.UserInformation

	if strings.Contains(identity, "@") {
		user, err = s.repository.GetUserByEmail(ctx, identity)
		if err != nil && err == sql.ErrNoRows {
			return nil, errors.New(util.ErrInvalidUsernameEmail)
		}

		if err != nil {
			level.Error(s.logger).Log("err", err)
			return nil, err
		}
	} else {
		user, err = s.repository.GetUserByUsername(ctx, identity)
		if err != nil && err == sql.ErrNoRows {
			return nil, errors.New(util.ErrInvalidUsernameEmail)
		}
		if err != nil {
			level.Error(s.logger).Log("err", err)
			return nil, err
		}
	}

	if !user.Email_verified {
		return nil, errors.New(util.ErrEmailUnverified)
	}

	if err := util.PasswordCompare(user.Password, password); err != nil {
		fmt.Println(err)
		return nil, errors.New(util.ErrInvalidPassword)
	}

	return user, nil
}

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
