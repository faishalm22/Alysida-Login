package service

import (
	"log"
	"shadelx-be-usermgmt/util"

	"gopkg.in/gomail.v2"
)

const CONFIG_SMTP_HOST = "smtp.gmail.com"
const CONFIG_SMTP_PORT = 587
const CONFIG_SENDER_NAME = "Alysida Team <alysidateam@gmail.com>"
const CONFIG_AUTH_EMAIL = "alysidateam@gmail.com"
const CONFIG_AUTH_PASSWORD = "b1_alysida"

func sendEmail(Email string){
	otp := util.GenerateOTP
    mail := gomail.NewMessage()
    mail.SetHeader("From", CONFIG_SENDER_NAME)
    mail.SetHeader("To", Email)
    //mail.SetAddressHeader("Cc", "spataparlopord@gmail.com", "Tra Lala La")
    mail.SetHeader("Subject", "Test mail")
    mail.SetBody("text/html", "Hello, "+otp())
    //mail.Attach("./sample.png")

    dialer := gomail.NewDialer(
        CONFIG_SMTP_HOST,
        CONFIG_SMTP_PORT,
        CONFIG_AUTH_EMAIL,
        CONFIG_AUTH_PASSWORD,
    )

	//dialer := &gomail.Dialer{Host: CONFIG_SMTP_HOST, Port: CONFIG_SMTP_PORT}

    err := dialer.DialAndSend(mail)
    if err != nil {
        log.Fatal(err.Error())
    }

    log.Println("Mail sent!")
}