// package main

// import (
// 	"fmt"
// 	"log"
// 	"net/smtp"
// 	"strings"
// )

// const CONFIG_SMTP_HOST = "smtp.gmail.com"
// const CONFIG_SMTP_PORT = 587
// const CONFIG_SENDER_NAME = "Alysida team <salausu12@gmail.com>"
// const CONFIG_AUTH_EMAIL = "salausu12@gmail.com"
// const CONFIG_AUTH_PASSWORD = "salmasalmasalma"

// func main() {
//     to := []string{"salmashrmn@gmail.com", "salma.aulia.tif20@polban.ac.id"}
//     cc := []string{"spataparlopord@gmail.com"}
//     subject := "Test mail"
//     message := "Hello"

//     err := sendMail(to, cc, subject, message)
//     if err != nil {
//         log.Fatal(err.Error())
//     }

//     log.Println("Mail sent!")
// }

// func sendMail(to []string, cc []string, subject, message string) error {
//     body := "From: " + CONFIG_SENDER_NAME + "\n" +
//         "To: " + strings.Join(to, ",") + "\n" +
//         "Cc: " + strings.Join(cc, ",") + "\n" +
//         "Subject: " + subject + "\n\n" +
//         message

//     auth := smtp.PlainAuth("", CONFIG_AUTH_EMAIL, CONFIG_AUTH_PASSWORD, CONFIG_SMTP_HOST)
//     smtpAddr := fmt.Sprintf("%s:%d", CONFIG_SMTP_HOST, CONFIG_SMTP_PORT)

//     err := smtp.SendMail(smtpAddr, auth, CONFIG_AUTH_EMAIL, append(to, cc...), []byte(body))
//     if err != nil {
//         return err
//     }

//     return nil
// }

package main

import (
	"log"
	//"main/coba"
	"main/otp"

	"gopkg.in/gomail.v2"
)

const CONFIG_SMTP_HOST = "smtp.gmail.com"
const CONFIG_SMTP_PORT = 587
const CONFIG_SENDER_NAME = "Alysida Team <alysidateam@gmail.com>"
const CONFIG_AUTH_EMAIL = "alysidateam@gmail.com"
const CONFIG_AUTH_PASSWORD = "b1_alysida"

func main() {
    otp := otp.GenerateOTP
    mailer := gomail.NewMessage()
    mailer.SetHeader("From", CONFIG_SENDER_NAME)
    mailer.SetHeader("To", "salma.aulia.tif20@polban.ac.id")
    //mailer.SetAddressHeader("Cc", "spataparlopord@gmail.com", "Tra Lala La")
    mailer.SetHeader("Subject", "Test mail")
    mailer.SetBody("text/html", "Hello, "+otp())
    mailer.Attach("./sample.png")

    dialer := gomail.NewDialer(
        CONFIG_SMTP_HOST,
        CONFIG_SMTP_PORT,
        CONFIG_AUTH_EMAIL,
        CONFIG_AUTH_PASSWORD,
    )

	//dialer := &gomail.Dialer{Host: CONFIG_SMTP_HOST, Port: CONFIG_SMTP_PORT}

    err := dialer.DialAndSend(mailer)
    if err != nil {
        log.Fatal(err.Error())
    }

    log.Println("Mail sent!")
}

// package main

// import (
// 	"log"
// 	//"gopkg.in/gomail.v2"
//     "encoding/json"
//     "net/http"
//     "fmt"
// )

// type Member struct{
// 	Email string `json:"email"`	
// }

// type JSONResponse struct{
// 	Code int `json:"code"`
// 	Success bool `json:"Success"`
// 	Message string `json:"Message"`
// 	Data interface{} `json:"data"`
// }

// const CONFIG_SMTP_HOST = "smtp.gmail.com"
// const CONFIG_SMTP_PORT = 587
// const CONFIG_SENDER_NAME = "Alysida Team <alysidateam@gmail.com>"
// const CONFIG_AUTH_EMAIL = "alysidateam@gmail.com"
// const CONFIG_AUTH_PASSWORD = "b1_alysida"

// func main() {

// 	http.HandleFunc("/forgot", func(rw http.ResponseWriter, r *http.Request){
// 		if r.Method == "POST"{
// 			jsonDecode := json.NewDecoder(r.Body)
// 			eMail := Member{}
// 			res := JSONResponse{}
			
// 			if err := jsonDecode.Decode(&eMail); err != nil{
// 				fmt.Println("Terjadi Kesalahan")
// 				http.Error(rw, "Terjadi Kesalahan", http.StatusInternalServerError)
// 				return
// 			}
			
// 			res.Code = http.StatusCreated
// 			res.Success = true
// 			res.Message = "Berhasil Menambahkan Data"
// 			res.Data = eMail

// 			resJSON, err := json.Marshal(res)
// 			if err != nil {
// 				fmt.Println("Terjadi Kesalahan")
// 				http.Error(rw, "Terjadi Kesalahan saat ubah json", http.StatusInternalServerError)
// 				return
// 			}
// 			rw.Header().Add("Content-Type", "application/json")
// 			rw.Write(resJSON)
// 		}
// 	})
// 	fmt.Println("Listening on: 8080 ....")
// 	log.Fatal(http.ListenAndServe(":8080", nil))

//     // mailer := gomail.NewMessage()
//     // mailer.SetHeader("From", CONFIG_SENDER_NAME)
//     // mailer.SetHeader("To", eMail)
//     // //mailer.SetAddressHeader("Cc", "spataparlopord@gmail.com", "Tra Lala La")
//     // mailer.SetHeader("Subject", "Test mail")
//     // mailer.SetBody("text/html", "Hello, <b>have a nice day</b>")
//     // mailer.Attach("./sample.png")

//     // dialer := gomail.NewDialer(
//     //     CONFIG_SMTP_HOST,
//     //     CONFIG_SMTP_PORT,
//     //     CONFIG_AUTH_EMAIL,
//     //     CONFIG_AUTH_PASSWORD,
//     // )

// 	// //dialer := &gomail.Dialer{Host: CONFIG_SMTP_HOST, Port: CONFIG_SMTP_PORT}

//     // err := dialer.DialAndSend(mailer)
//     // if err != nil {
//     //     log.Fatal(err.Error())
//     // }

//     // log.Println("Mail sent!")
// }