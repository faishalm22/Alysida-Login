package datastruct

import (
	"context"
	"time"
)

type (
	// UserInformation represent user inside business logic
	UserInformation struct {
		UserID         uint32    `json:"user_id,omitempty"`
		Username       string    `json:"username" validate:"required,username,min=6,max=20"`
		Email          string    `json:"email" validate:"required,email"`
		Name           string    `json:"name,omitempty"`
		Phonenumber    string    `json:"phonenumber,omitempty"`
		Password       string    `json:"password" validate:"required,min=6"`
		CreatedDate    time.Time `json:"created_date,omitempty"`
		UpdatedDate    time.Time `json:"updated_date,omitempty"`
		Email_verified bool      `json:"email_verified,omitempty"`
		Image_file     string    `json:"image_file,omitempty"`
		Identity_type  string    `json:"identity_type,omitempty"`
		Identity_no    string    `json:"identity_no,omitempty"`
		Address_ktp    string    `json:"address_ktp,omitempty"`
		Domisili       string    `json:"domisili,omitempty"`
		TokenHash      string    `json:"token_hash,omitempty"`
	}

	// DBRepository list all db operartion for those entity
	DBRepository interface {
		GetUserByEmail(ctx context.Context, email string) (*UserInformation, error)
		GetUserByUsername(ctx context.Context, username string) (*UserInformation, error)
		EmailIsExist(ctx context.Context, email string) (bool, error)
		UsernameIsExist(ctx context.Context, username string) (bool, error)
	}
)
