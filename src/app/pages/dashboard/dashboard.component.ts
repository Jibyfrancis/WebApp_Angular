import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url!: string;
  formdata = new FormData();
  user!: any;
  images: any;

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token'))
      this.auth.gotoDashboard(localStorage.getItem('token')).subscribe((res: any) => {
        if (res && res['status'] === 'ok') {
          console.log("we are in dashboard");
          this.user = res['data'];
          this.url = res['data']['image'];

        } else {
          console.log("something went wrong in dashboard");
        }
      }, (err) => {
        if (err) {
          console.log(err);

          console.log("we got an error");

        }
      })
  }

  selectImg(event: any) {
    // console.log(event.target.files[0])
    if (event.target.files[0]) {
      let reader = new FileReader();
      // const formdata = new FormData();
      this.formdata.append('image', event.target.files[0]);
      // this.formdata.append('upload_preset', 'hk0nezym');
      // this.formdata.append('cloud_name', 'dchrawfgy');

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  uploadImage() {
    console.log(this.formdata)
    this.auth.uploadImage(this.formdata, localStorage.getItem('token')).subscribe((data: any) => {
      console.log(data);
      if (data.status) {
        window.alert("image have been changed")
        localStorage.setItem('image', data.url)
      } else {
        window.alert("error occoured")
      }

    });
  }

  OnLogout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}

