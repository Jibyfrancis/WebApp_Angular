import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm!: FormGroup;
  message: string = ""
  className = 'd-none'
  submit: boolean = false


  genderValues = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Others', value: 'others' }
  ];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {


    this.signupForm = this.fb.group({
      "userName": ["", Validators.required],
      "email": ["", [Validators.required, Validators.email]],
      "mobile": ["", [Validators.required,Validators.pattern("[0-9]"), Validators.minLength(10), Validators.maxLength(10)]],
      "gender": ["", Validators.required],
      "password": ["", [Validators.required, Validators.minLength(8)]]
    });
  }
  get f() {
    return this.signupForm.controls
  }
  signup() {
    this.submit = true;
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.auth.signup(this.signupForm.value).subscribe((res: any) => {
        if (res && res['status'] === 'ok' && res['data']['_id']) {
          this.router.navigate(['/login'])
        }
      }, (err) => {
        if (err) {
          console.log("we got an error signup");
        }
      })
    }
  }

  getError(field: string, error: string) {
    return this.signupForm.get(field)?.hasError(error) && this.submit;
  }

  gotoLogin() {

  }


}
