import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "src/app/service/auth.service";


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {


  AdminLoginForm!: FormGroup
  constructor(private auth: AuthService, private router: Router) {

    this.AdminLoginForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }
  login() {
    console.log(this.AdminLoginForm.value);


    if (this.AdminLoginForm.valid) {
      this.auth.adminLogin(this.AdminLoginForm.value).subscribe(res => {
        console.log(res);

        if (res && res['status'] === 'ok') {
          console.log("working");
          this.router.navigate(['/admin/dashboard'])
        }
      })
    }

  }

}
