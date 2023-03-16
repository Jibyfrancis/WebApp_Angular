import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  editForm!: FormGroup;
  className = 'd-none';
  message = '';
  // userName:any|undefined

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      userName: ['', Validators.required],
      mobile: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]]
    });

    this.auth.getUserData(this.router.snapshot.params['id']).subscribe((result) => {
      console.log(result);
      // this.userName = result;

      if (result) {
        this.editForm.patchValue({
          // userName: result.userName,
          // mobile: result.mobile,
        });
      }
    });
  }

  update(): void {
    // handle form submission here
  }
}
