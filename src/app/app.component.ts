import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HelperService } from './utils/helper.service';

@Component({
 selector: 'app-root',
 standalone: true,
 imports: [RouterOutlet],
 templateUrl: './app.component.html',
 styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 constructor(private readonly router: Router,private help : HelperService){ }
 ngOnInit(): void {
  this.loginCheck();
 }
 loginCheck(){
    console.log(1231)
    let token = this.help.getData('token')
    if(token){
        this.router.navigate(['layout'])
    }
    else{
        this.router.navigate(['login'])
    }
 }
}
