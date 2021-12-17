package service

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	//"strconv"

	"gopkg.in/gomail.v2"
)

const CONFIG_SMTP_HOST = "smtp.gmail.com"
const CONFIG_SMTP_PORT = 587
const CONFIG_SENDER_NAME = "Alysida Team <alysidateam@gmail.com>"
const CONFIG_AUTH_EMAIL = "alysidateam@gmail.com"
const CONFIG_AUTH_PASSWORD = "b1_alysida"

type BodylinkEmail struct {
	Username string
    Code uint64
}

func sendEmail(Email string, username string, otp uint64) {
    templateData := BodylinkEmail{
		Username: username,
        Code: otp,
	}
	//code := strconv.FormatUint(otp, 10)
	mail := gomail.NewMessage()
    body, _ :=ParseTemplate("templates/password_reset.html",templateData)
	mail.SetHeader("From", CONFIG_SENDER_NAME)
	mail.SetHeader("To", Email)
	//mail.SetAddressHeader("Cc", "spataparlopord@gmail.com", "Tra Lala La")
	mail.SetHeader("Subject", "Reset SadhleX Password")
	mail.SetBody("text/html", body)
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

func ParseTemplate(templateFileName string, data interface{}) (string, error) {
	t, err := template.ParseFiles(templateFileName)
	if err != nil {
		return "", err
	}
	buf := new(bytes.Buffer)
	if err = t.Execute(buf, data); err != nil {
		fmt.Println(err)
		return "", err
	}
	return buf.String(), nil
}
