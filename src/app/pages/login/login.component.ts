import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/service/auth.service';
import { loginRequest } from 'src/app/state/auth/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginForm!: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, public router: Router, private store: Store) {
    this.LoginForm = this.fb.group({
      "email": ["", Validators.required],
      "password": ["", Validators.required]
    })
  }
  error: string = ""

  login() {
    if (this.LoginForm.valid) {
      // alert(this.LoginForm.value.email)


      // this.store.dispatch(loginRequest({ credentials: { email: this.LoginForm.value.email, password: this.LoginForm.value.password } }));
      this.auth.login(this.LoginForm.value).subscribe(res => {
        if (res && res['status'] === 'ok' && res['data']['response'] && res['data']['authToken']) {
          localStorage.setItem('token', res['data']['authToken'])
          this.router.navigate(['/dashboard'])
        }
        if (res["data"] === "invalide user Name or password") {
          this.error = "Invalide user Name or password";
          console.log(this.error);


        }

      }), (err: any) => {
        console.log("something wrong"+err);

      }

    }
  }
}
