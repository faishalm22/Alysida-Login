package datastruct

import (
	"context"
	"time"
)

type (
	// UserInformation represent user inside business logic
	UserInformation struct {
		UserID        uint32    `json:"user_id,omitempty"`
		Username      string    `json:"username" validate:"required,username,min=6,max=20"`
		Email         string    `json:"email" validate:"required,email"`
		Firstname     string    `json:"firstname,omitempty"`
		Lastname      string    `json:"lastname,omitempty"`
		Phonenumber   string    `json:"phonenumber,omitempty"`
		Password      string    `json:"password" validate:"required,min=6"`
		CreatedBy     string    `json:"created_by,omitempty"`
		CreatedDate   time.Time `json:"created_date,omitempty"`
		UpdatedBy     string    `json:"updated_by,omitempty"`
		UpdatedDate   time.Time `json:"updated_date,omitempty"`
		TokenHash     string    `json:"token_hash"`
		EmailVerified bool      `json:"email_verified,omitempty"`
		ImageFile     string    `json:"image_file,omitempty"`
	}

	// DBRepository list all db operartion for those entity
	DBRepository interface {
		CreateUser(ctx context.Context, user *UserInformation) error
		GetUserByEmail(ctx context.Context, email string) (*UserInformation, error)
		GetUserByUsername(ctx context.Context, username string) (*UserInformation, error)
		EmailIsExist(ctx context.Context, email string) (bool, error)
		UsernameIsExist(ctx context.Context, username string) (bool, error)
	}
)
