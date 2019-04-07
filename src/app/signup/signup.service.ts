import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class SignUpService {

   private signupSubScription = new Subject<object>();
   // private baseUrl: string = `http://192.168.1.9:3002`;
   private baseUrl: string = `https://my-user-backend.herokuapp.com`;
   constructor(private http: HttpClient) { }

   onSignUp(doc) {
      this.http.post(`${this.baseUrl}/api/user/signup`, doc)
         .subscribe(response => {
            console.log('response from server');
            this.signupSubScription.next({ status: true, response });
         })
   }

   observeChanges() {
      return this.signupSubScription.asObservable();
   }

}