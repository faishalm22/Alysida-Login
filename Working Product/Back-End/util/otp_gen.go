package util

import (
	"math/rand"
)

func GenerateOTP() string {
	var otp string
	numberSet := []rune("0123456789")
	otpLength := make([]rune, 6)

	for i := range otpLength {
		otpLength[i] = numberSet[rand.Intn(len(numberSet))]
	}
	otp = string(otpLength)

	return "this is your otp: " + otp
}
