import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/auth/register", data)
  }
  login(userData: any): Observable<any> {
    return this.http.post("http://localhost:3000/auth/login", userData)
  }

  gotoDashboard(token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get('http://localhost:3000/auth/dashboard', { headers: headers });
  }

  uploadImage(data: FormData, token: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("submitting image")
    return this.http.post(`http://localhost:3000/auth/image-upload`, data, { headers: headers });
  }

  adminLogin(userData: any) :Observable<any> {

    return this.http.post('http://localhost:3000/admin/login', userData)
  }

  adminDashboard() {
    return this.http.get('http://localhost:3000/admin/dashboard')
  }

  deleteUser(data: any) {
    console.log(data)
    return this.http.post('http://localhost:3000/admin/deleteUser', data)
  }

  searchUser(data: any) {
    return this.http.get(`http://localhost:3000/admin/doUserSearch?name=${data}`)
  }
  getUserData(id:any){
    return this.http.get(`http://localhost:3000/admin/getUser/${id}`)
  }



}
