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
	queryInsertUser        = "INSERT INTO tbl_mstr_user(user_id, username, email, firstname, lastname, phonenumber, password, created_date, created_by, updated_date, updated_by, token_hash, email_verified, image_file) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);"
	queryGetUserByEmail    = "SELECT * FROM tbl_mstr_user WHERE email=$1 LIMIT 1;"
	queryGetUserByUsername = "SELECT * FROM tbl_mstr_user WHERE username=$1 LIMIT 1;"
	queryEmailIsExists     = "SELECT EXISTS(SELECT 1 FROM tbl_mstr_user WHERE email=$1);"
	queryUsernameIsExists  = "SELECT EXISTS(SELECT 1 FROM tbl_mstr_user WHERE username=$1);"
)

// CreateUser inserts the given user into the database
func (repo *repo) CreateUser(ctx context.Context, user *datastruct.UserInformation) error {

	level.Debug(repo.logger).Log("msg", "start CreateUser", "user", user.Email)

	_, err := repo.db.ExecContext(
		ctx,
		queryInsertUser,
		user.UserID,
		user.Username,
		user.Email,
		user.Firstname,
		user.Lastname,
		user.Phonenumber,
		user.Password,
		user.CreatedDate,
		user.CreatedBy,
		user.UpdatedDate,
		user.UpdatedBy,
		user.TokenHash,
		user.EmailVerified,
		user.ImageFile,
	)
	if err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return err
	}

	level.Debug(repo.logger).Log("msg", "finish CreateUser")

	return nil
}

// GetUserByEmail retrieves the user object having the given email, else returns error
func (repo *repo) GetUserByEmail(ctx context.Context, email string) (*datastruct.UserInformation, error) {

	level.Debug(repo.logger).Log("msg", "start GetUserByEmail", "email", email)

	var user datastruct.UserInformation
	err := repo.db.QueryRowContext(ctx, queryGetUserByEmail, email).Scan(
		&user.UserID,
		&user.Username,
		&user.Email,
		&user.Firstname,
		&user.Lastname,
		&user.Phonenumber,
		&user.Password,
		&user.CreatedBy,
		&user.CreatedDate,
		&user.UpdatedBy,
		&user.UpdatedDate,
		&user.TokenHash,
		&user.EmailVerified,
		&user.ImageFile,
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
		&user.Firstname,
		&user.Lastname,
		&user.Phonenumber,
		&user.Password,
		&user.CreatedBy,
		&user.CreatedDate,
		&user.UpdatedBy,
		&user.UpdatedDate,
		&user.TokenHash,
		&user.EmailVerified,
		&user.ImageFile,
	)
	if err != nil {
		level.Error(repo.logger).Log("err", err.Error())
		return nil, err
	}

	level.Debug(repo.logger).Log("msg", "finish GetUserByUsername")

	return &user, nil
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
