package service

import (
	"context"
	"net/http"

	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
)

// NewHTTPServer ...
func NewHTTPServer(ctx context.Context, endpoints Endpoints) http.Handler {
	r := mux.NewRouter()

	apiR := r
	apiR.Use(JSONHeader)

	postR := apiR.Methods(http.MethodPost).Subrouter()
	// postR.Use(MiddlewareValidateUser)

	//untuk login
	postR.Path("/login").Handler(httptransport.NewServer(
		endpoints.Login,
		decodeLoginRequest,
		encodeResponse,
	))

	refTokenR := apiR.Methods(http.MethodPost).Subrouter()
	refTokenR.Use(MiddlewareValidateRefreshToken)
	refTokenR.Path("/refresh-token").Handler(httptransport.NewServer(
		endpoints.RefresToken,
		decodeRefreshTokenRequest,
		encodeResponse,
	))

	//untuk dapat otp
	postR.Path("/get-password-reset-code").Handler(httptransport.NewServer(
		endpoints.GetOTP,
		decodeGetOTPRequest,
		encodeResponse,
	))

	mailR := apiR.PathPrefix("/verify").Methods(http.MethodPost).Subrouter()

	//untuk verifikasi otp
	mailR.Path("/password-reset").Handler(httptransport.NewServer(
		endpoints.VerifyOTP,
		decodeVerifyPasswordReset,
		encodeResponse,
	))

	putR := apiR.Methods(http.MethodPut).Subrouter()

	putR.Path("/reset-password").Handler(httptransport.NewServer(
		endpoints.ResetPassword,
		decodeResetPassword,
		encodeResponse,
	))

	getR := apiR.Methods(http.MethodGet).Subrouter()

	getR.Path("/check-username/{username}").Handler(httptransport.NewServer(
		endpoints.UsernameAvailability,
		decodeUsernameAvailabilityRequest,
		encodeResponse,
	))

	// @ %40
	getR.Path("/check-email/{email}").Handler(httptransport.NewServer(
		endpoints.EmailAvailability,
		decodeEmailAvailabilityRequest,
		encodeResponse,
	))

	return r

}

// JSONHeader ...
func JSONHeader(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
