import { Component, OnInit } from "@angular/core";
import { SignUpService } from "./signup.service";
import { Subscription } from "rxjs";

@Component({
   selector: 'app-signup',
   templateUrl: "./signup.component.html",
   styleUrls: ["./signup.component.css"]
})
export class SignUpComponent implements OnInit {

   private signUpChanges: Subscription;
   private response: object = {};
   private email: string = "";
   private password: string = "";
   private username: string = "";
   private selector: HTMLFormElement = null;
   constructor(private signUpService: SignUpService) { }

   ngOnInit() {
      this.observeChanges();
   }
   handleSumbit(event) {
      event.preventDefault();
      const obj = {
         email: this.email,
         username: this.username,
         password: this.password
      }
      console.log(`sending\n${JSON.stringify(obj)}`);
      this.signUpService.onSignUp(obj);
      this.selector = event.target;
   }
   handleInput(element, name) {
      switch (name) {
         case "email": this.email = element.value; break;
         case "username": this.username = element.value; break
         case "password": this.password = element.value; break;
         default: break;
      }
   }
   resetForm() {
      if(this.selector) {
         this.selector.reset();
      }
   }
   observeChanges() {
      this.signUpChanges = this.signUpService.observeChanges().subscribe(response => {
         console.log('[response from server]', response);
         this.response = response;
         if(response['status'] === true) {
            this.resetForm();
         }
      })
   }
}