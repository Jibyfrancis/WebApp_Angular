import { Component ,OnInit} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  searchText:any
  allUsers: any;

  constructor(private apicallService: AuthService) { }

  ngOnInit(): void {
    this.apicallService.adminDashboard().subscribe((users: any) => {
      console.log(users);
      this.allUsers = users;
    })
  }

  deleteUser(data: any) {
    this.apicallService.deleteUser(data).subscribe((data) => {
      window.alert("user have been deleted")
      location.reload()
    })
  }
  editUser(data:any){


  }

  async search() {
    await this.apicallService.searchUser(this.searchText).subscribe((data: any) => {
      this.allUsers = data.data;
    })
  }

}
