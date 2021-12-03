package coba

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Member struct{
	Email string `json:"email"`	
}

type JSONResponse struct{
	Code int `json:"code"`
	Success bool `json:"Success"`
	Message string `json:"Message"`
	Data interface{} `json:"data"`
}

func ForgotPassword(){
	members := []Member{}
	members = append(members, Member{"salma.aulia.tif20@polban.ac.id"})
	members = append(members, Member{"nur.lia.tif20@polban.ac.id"})

	http.HandleFunc("/forgot", func(rw http.ResponseWriter, r *http.Request){
		if r.Method == "POST"{
			jsonDecode := json.NewDecoder(r.Body)
			eMail := Member{}
			res := JSONResponse{}
			
			if err := jsonDecode.Decode(&eMail); err != nil{
				fmt.Println("Terjadi Kesalahan")
				http.Error(rw, "Terjadi Kesalahan", http.StatusInternalServerError)
				return
			}
			
			res.Code = http.StatusCreated
			res.Success = true
			res.Message = "Berhasil Menambahkan Data"
			res.Data = eMail

			resJSON, err := json.Marshal(res)
			if err != nil {
				fmt.Println("Terjadi Kesalahan")
				http.Error(rw, "Terjadi Kesalahan saat ubah json", http.StatusInternalServerError)
				return
			}
			rw.Header().Add("Content-Type", "application/json")
			rw.Write(resJSON)
		}
	})
	fmt.Println("Listening on: 8080 ....")
	log.Fatal(http.ListenAndServe(":8080", nil))
}