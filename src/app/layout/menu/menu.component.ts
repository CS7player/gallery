import { Component, OnInit } from '@angular/core';
import { DataFetchService } from '../../utils/data-fetcher.service';
import { ConstantsService } from '../../utils/constants.service';
import { HelperService } from '../../utils/helper.service';
import { ContentComponent } from "../content/content.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ContentComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  userData:any = [];
  userid:string='';
  loginUserId:string = '';
  constructor(private http: DataFetchService,private help: HelperService){}
  ngOnInit(): void {
    let details = this.help.getData('details');
    this.loginUserId = details['_id'];
    this.userid = this.loginUserId
    this.getUser();
  }

  getUser(){
    this.http.doGet(ConstantsService.GALLERY_URL+'/user/details?id='+this.loginUserId).subscribe({
      next:(res : any)=>{
        if(res['status']){
          this.userData = res['data'];
        }
      },error: (err)=>{
        console.log(err)
      }
    })
  }

  changer(eve:any){
    this.userid = eve['_id']
  }
  
}
