package service

import (
	"context"
	"encoding/json"

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
	}

	// LoginReq data format
	LoginReq struct {
		Identity string
		Password string
	}

	// UsernameAvailabilityReq data format
	UsernameAvailabilityReq struct {
		Username string `json:"username"`
	}

	// EmailAvailabilityReq data format
	EmailAvailabilityReq struct {
		Email string `json:"email"`
	}

	// Response format
	Response struct {
		Status  bool        `json:"status"`
		Message string      `json:"msg"`
		Data    interface{} `json:"data,omitempty"`
	}

	userRes struct {
		UserID    uint32 `json:"user_id,omitempty"`
		Username  string `json:"username,omitempty"`
		Email     string `json:"email,omitempty"`
		Name string `json:"name,omitempty"`
		ImageFile string `json:"image_file,omitempty"`
	}

)

func MakeAuthEndpoints(svc Service) Endpoints {
	return Endpoints{
		Login:                makeLoginEndopint(svc),
		UsernameAvailability: makeUsernameAvailabilityRequest(svc),
		EmailAvailability:    makeEmailAvailabilityRequest(svc),
	}
}

func makeLoginEndopint(svc Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(LoginReq)
		user, err := svc.Login(ctx, req.Identity, req.Password)
		if err != nil {
			return Response{Status: false, Message: err.Error()}, nil
		}

		var userRes userRes
		userRes.UserID = user.UserID
		userRes.Username = user.Username
		userRes.Email = user.Email
		userRes.Name = user.Name
		userRes.ImageFile = user.Image_file

		return Response{
			Status:  true,
			Message: util.MsgLoginSuccess,
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
