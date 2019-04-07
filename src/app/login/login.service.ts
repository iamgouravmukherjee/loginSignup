import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })

export class LoginService {

   private response = new Subject();
   // private baseUrl: string = `http://192.168.1.9:3002`;
   private baseUrl: string = `https://my-user-backend.herokuapp.com`;
   constructor(private http: HttpClient) { }

   getUser(text: string, password: string) {
      const obj = { text, password }
      this.http.post(`${this.baseUrl}/api/user/login`, obj)
         .subscribe(response => {
            this.response.next(response);
         });
   }

   userUpdated() {
      return this.response.asObservable();
   }
}