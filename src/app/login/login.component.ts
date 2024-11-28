import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ConstantsService } from '../utils/constants.service';
import { DataFetchService } from '../utils/data-fetcher.service';
import { HelperService } from '../utils/helper.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-login',
 standalone: true,
 imports: [FormsModule],
 templateUrl: './login.component.html',
 styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

 title: string = '';
 isShowPassword: boolean = false;
 username: string = '';
 email: string = '';
 password: string = '';
 isSignUp: boolean = true;
 isloading: boolean = false;
 response: string = '';
 isResponse: boolean = false;
 btnText: string = '';
 loginChanger = [{ name: 'L0GIN', tag: 0, text: 'Login up' }, { name: 'SIGN UP', tag: 1, text: 'Sign Up!! ' }, { name: 'Password', tag: 2, text: 'Forget Password!!' }]
 activeTag: number = 0;
 notlogin: any = [];

 constructor(private readonly http: DataFetchService, private readonly help: HelperService, private router: Router) { }
 ngOnInit(): void {
  this.setUp(0);
 }

 setUp(i: number) {
  this.username = '';
  this.password = '';
  this.email = '';
  this.activeTag = i;
  this.title = this.loginChanger[i]['name'];
  this.notlogin = this.loginChanger.filter((ele: any) => ele['tag'] !== i);
  if (i == 0) {
   this.isSignUp = false;
   this.btnText = 'Login';
  }
  else {
   this.isSignUp = true;
   this.btnText = 'Submit';
  }
 }

 validation() {
  if (this.username.length < 7) {
   this.isResponse = true;
   this.response = 'Username must be at least 7 letters long!';
   this.cleanResponse();
  } else if (this.password.length < 7) {
   this.isResponse = true;
   this.response = 'Password must be at least 7 characters long!';
   this.cleanResponse();
  } else {
   if (this.activeTag == 0) {
    this.userVerfication();
   } else if (this.activeTag == 1) {
    this.userSignup();
   } else if (this.activeTag == 2) {
    this.userPassword();
   }
  }
 }

 userVerfication() {
  this.isloading = true;
  let params = { username: this.username, password: this.password }
  this.http.doPost(ConstantsService.GALLERY_URL + '/user/login', params).subscribe({
   next: (res: any) => {
    this.isloading = false;
    if (res['status']) {
     this.help.setData('token', res['token']);
     this.help.setData('details', res['data']);
     setTimeout(() => {
      this.router.navigate(['layout'])
     }, 2000);
    }
    this.isResponse = true;
    this.response = res['msg'];
   },
   error: (err) => {
    this.isloading = false;
    console.log(err);
   }
  })
  this.cleanResponse();
 }

 userSignup() {
  this.isloading = true;
  let params = { username: this.username, password: this.password, email: this.email }
  this.http.doPost(ConstantsService.GALLERY_URL + '/user/add', params).subscribe({
   next: (res: any) => {
    this.isloading = false;
    if (res['status']) {
     this.setUp(0);
    }
    this.isResponse = true;
    this.response = res['msg'];
   },
   error: (err) => {
    this.isloading = false;
    console.log(err);
   }
  })
  this.cleanResponse();
 }

 userPassword() {
  this.isloading = true;
  let params = { username: this.username, password: this.password, email: this.email }
  this.http.doPut(ConstantsService.GALLERY_URL + '/user/update', params).subscribe({
   next: (res: any) => {
    this.isloading = false;
    if (res['status']) {
     this.setUp(0);
    }
    this.isResponse = true;
    this.response = res['msg'];
   },
   error: (err) => {
    this.isloading = false;
    console.log(err);
   }
  })
  this.cleanResponse();
 }

 cleanResponse() {
  setTimeout(() => {
   this.isResponse = false;
   this.response = '';
  }, 3000);
 }

 get emailcheck() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(this.email)) {
   return true;
  }
  return false;
 }
}
