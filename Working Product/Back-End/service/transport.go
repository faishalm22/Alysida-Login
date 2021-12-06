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

	postR.Path("/login").Handler(httptransport.NewServer(
		endpoints.Login,
		decodeLoginRequest,
		encodeResponse,
	))

	//untuk dapat otp////////////
	postR.Path("/get-password-reset-code").Handler(httptransport.NewServer(
		endpoints.GetOTP,
		decodeGetOTPRequest,
		encodeResponse,
	))/////////

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
