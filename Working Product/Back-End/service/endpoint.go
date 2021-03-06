package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"shadelx-be-usermgmt/util"

	"github.com/go-kit/kit/endpoint"
	"github.com/gorilla/mux"
)

type (
	// Endpoints define all endpoint
	Endpoints struct {
		Login                endpoint.Endpoint
		UsernameAvailability endpoint.Endpoint
		EmailAvailability    endpoint.Endpoint
		RefresToken          endpoint.Endpoint
		GetOTP               endpoint.Endpoint
		VerifyOTP            endpoint.Endpoint
		ResetPassword        endpoint.Endpoint
	}

	// LoginReq data format
	LoginReq struct {
		Identity string
		Password string
	}

	// OTPreq data format
	OTPreq struct {
		Identity string `json:"identity"`
	}

	// VerifyOTPreq data format
	VerifyOTPreq struct {
		Identity string `json:"identity"`
		Code     string `json:"code"`
	}

	// UsernameAvailabilityReq data format
	UsernameAvailabilityReq struct {
		Username string `json:"username"`
	}

	// EmailAvailabilityReq data format
	EmailAvailabilityReq struct {
		Email string `json:"email"`
	}

	// RefresTokenReq data format
	RefreshTokenReq struct {
		Username  string `json:"username"`
		CustomKey string `json:"custom_key,omitempty"`
	}

	// ResetPasswordReq data format
	ResetPasswordReq struct {
		Identity   string `json:"identity"`
		Password   string `json:"password"`
		PasswordRe string `json:"password_re"`
		Code       string `json:"code"`
	}

	// Response format
	Response struct {
		Status  bool        `json:"status"`
		Message string      `json:"msg"`
		Data    interface{} `json:"data,omitempty"`
	}

	tokenRes struct {
		TokenAccess  string `json:"token_access,omitempty"`
		TokenRefresh string `json:"token_refresh,omitempty"`
	}

	userRes struct {
		UserID    uint32 `json:"user_id,omitempty"`
		Username  string `json:"username,omitempty"`
		Email     string `json:"email,omitempty"`
		Name      string `json:"name,omitempty"`
		ImageFile string `json:"image_file,omitempty"`
	}
)

func MakeAuthEndpoints(svc Service) Endpoints {
	return Endpoints{
		Login:                makeLoginEndopint(svc),
		UsernameAvailability: makeUsernameAvailabilityRequest(svc),
		EmailAvailability:    makeEmailAvailabilityRequest(svc),
		RefresToken:          makeRefreshTokenEndopint(svc),
		GetOTP:               makeGetOTPEndpoint(svc),
		VerifyOTP:            makeVerifyOTPEndpoint(svc),
		ResetPassword:        makeResetPasswordEndpoint(svc),
	}
}

//Endpoint untuk login
func makeLoginEndopint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(LoginReq)
		user, token, err := svc.Login(ctx, req.Identity, req.Password)
		if err != nil {
			return Response{Status: false, Message: err.Error()}, nil
		}

		var tokenRes tokenRes
		tokenRes.TokenAccess = token["access_token"]
		tokenRes.TokenRefresh = token["refresh_token"]

		var userRes userRes
		userRes.UserID = user.UserID
		userRes.Username = user.Username
		userRes.Email = user.Email
		userRes.Name = user.Name
		userRes.ImageFile = user.Image_file

		data := make(map[string]interface{})
		data["user"] = userRes
		data["token"] = tokenRes

		return Response{
			Status:  true,
			Message: util.MsgLoginSuccess,
			Data:    data,
		}, nil
	}
}

func decodeLoginRequest(_ context.Context, r *http.Request) (request interface{}, err error) {
	var req LoginReq

	if e := json.NewDecoder(r.Body).Decode(&req); e != nil {
		return nil, e
	}
	return req, nil
}

//Endpoint refresh token
func makeRefreshTokenEndopint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(RefreshTokenReq)
		res, err := svc.RefreshToken(ctx, req.Username, req.CustomKey)
		if res == "" && err != nil {
			return Response{
				Status:  false,
				Message: err.Error(),
			}, nil
		}

		if res != "" && err == nil {
			return Response{
				Status: true,
				Data: tokenRes{
					TokenAccess: res,
				},
			}, nil

		}
		return Response{Status: false, Message: util.ErrInternalServerError}, nil
	}
}

func decodeRefreshTokenRequest(_ context.Context, r *http.Request) (request interface{}, err error) {
	var req RefreshTokenReq
	if e := json.NewDecoder(r.Body).Decode(&req); e != nil {
		return nil, e
	}

	customKey, ok := r.Context().Value(UserKey{}).(string)
	if !ok {
		return nil, errors.New("Can't get context")
	}

	req.CustomKey = customKey

	return req, nil
}

//Endpoint request otp
func makeGetOTPEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(OTPreq)
		ok, err := svc.GetOTP(ctx, req.Identity)
		if err != nil {
			return Response{Status: false, Message: err.Error()}, nil
		} else if ok && err == nil {
			return Response{Status: true, Message: util.MsgGeneratedPasswordResetCode}, nil
		}
		return Response{Status: false, Message: util.ErrInternalServerError}, nil
	}
}

func decodeGetOTPRequest(_ context.Context, r *http.Request) (request interface{}, err error) {
	var req OTPreq

	if e := json.NewDecoder(r.Body).Decode(&req); e != nil {
		return nil, e
	}
	return req, nil
}

//Endpoint verify otp
func makeVerifyOTPEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(VerifyOTPreq)
		ok, otpCode, err := svc.VerifyOTP(ctx, req.Identity, req.Code)
		if err != nil {
			return Response{Status: false, Message: err.Error()}, nil
		} else if ok && err == nil {
			data := make(map[string]interface{})
			data["code"] = otpCode
			return Response{Status: true, Message: util.MsgVerifiedPasswordResetCode, Data: data}, nil
		}
		return Response{Status: false, Message: util.ErrInternalServerError}, nil
	}
}

func decodeVerifyPasswordReset(_ context.Context, r *http.Request) (request interface{}, err error) {
	var req VerifyOTPreq
	if e := json.NewDecoder(r.Body).Decode(&req); e != nil {
		return nil, e
	}
	return req, nil
}

//Endpoint cek username
func makeUsernameAvailabilityRequest(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(UsernameAvailabilityReq)

		res, err := svc.UsernameAvailability(ctx, req.Username)
		if err != nil {
			return Response{Status: false, Message: err.Error()}, nil
		}
		return Response{Status: true, Message: res}, nil
	}
}

func decodeUsernameAvailabilityRequest(_ context.Context, r *http.Request) (request interface{}, err error) {
	var req UsernameAvailabilityReq
	params := mux.Vars(r)
	username := params["username"]

	req.Username = username

	return req, nil
}

//Endpoint cek email
func makeEmailAvailabilityRequest(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(EmailAvailabilityReq)

		res, err := svc.EmailAvailability(ctx, req.Email)
		if err != nil {
			return Response{Status: false, Message: err.Error()}, nil
		}
		return Response{Status: true, Message: res}, nil
	}
}

func decodeEmailAvailabilityRequest(_ context.Context, r *http.Request) (request interface{}, err error) {
	var req EmailAvailabilityReq
	params := mux.Vars(r)
	email := params["email"]

	req.Email = email
	fmt.Println(email)
	return req, nil
}

func encodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	res := response.(Response)
	sc := util.StatusCode(res.Message)
	if sc == 0 {
		sc = 500
	}
	w.WriteHeader(sc)
	return json.NewEncoder(w).Encode(&res)
}

func makeResetPasswordEndpoint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(ResetPasswordReq)
		err := svc.ResetPassword(ctx, req.Identity, req.Password, req.PasswordRe, req.Code)
		if err != nil {
			return Response{Status: false, Message: err.Error()}, nil
		}
		return Response{Status: true, Message: util.MsgPasswordReset}, nil
	}
}

func decodeResetPassword(_ context.Context, r *http.Request) (request interface{}, err error) {
	var req ResetPasswordReq

	if e := json.NewDecoder(r.Body).Decode(&req); e != nil {
		return nil, e
	}
	return req, nil
}
