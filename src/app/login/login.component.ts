import { Component } from '@angular/core';
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
export class LoginComponent {

 isShowPassword: boolean = false;
 username: string = '';
 password: string = '';
 isloading:boolean = false;
 response:string = '';
 isResponse: boolean = false;

 constructor(private readonly http : DataFetchService,private readonly help:HelperService,private router : Router){}

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
   this.userVerfication();
  }
 }

 userVerfication(){
    this.isloading=true;
    let params = {username:this.username,password:this.password}
    this.http.doPost(ConstantsService.GALLERY_URL+'/user/login',params).subscribe({
        next: (res : any) =>{
            this.isloading = false;
            if(res['status']){
                this.help.setData('token',res['token']);
                this.help.setData('details',params);
                setTimeout(() => {
                   this.router.navigate(['layout']) 
                }, 2000);
            }
            this.isResponse = true;
            this.response = res['msg'];
            
        },
        error: (err)=>{
            this.isloading = false;
            console.log(err);
        }
    })
    this.cleanResponse();
 }

 cleanResponse(){
    setTimeout(() => {
        this.isResponse =false;
        this.response = '';
    }, 3000);
 }

}
