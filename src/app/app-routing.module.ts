import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdmindashboardComponent } from './pages/admin/admindashboard/admindashboard.component';
import { AdminloginComponent } from './pages/admin/adminlogin/adminlogin.component';
import { UsereditComponent } from './pages/admin/useredit/useredit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {
    path: 'admin', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AdminloginComponent },
      { path: 'dashboard', component: AdmindashboardComponent },
      {path: 'dashboard/edit/:id', component:UsereditComponent}
    ]
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
