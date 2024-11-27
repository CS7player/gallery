import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../utils/helper.service';
import { DataFetchService } from '../../utils/data-fetcher.service';
import { ConstantsService } from '../../utils/constants.service';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit{

  constructor(private help : HelperService,private http : DataFetchService){}
  ngOnInit(): void {
    this.getImages();
  }
  imageData:any = [];
  isResponse:boolean = false;
  response:string = '';
  imageSrc: string = "";
  onChange(event: any) {
    this.imageSrc = event.target.files[0];
  }
  setImage(){
    let username = this.help.getData('details')['username'];
    const formData = new FormData();
    formData.append('username', username);
    formData.append('img', this.imageSrc);
    this.http.doPost(ConstantsService.GALLERY_URL+'/pics/add', formData).subscribe({
      next: (res: any) => {
        if(res['status']){
          this.isResponse = true;
          this.response = res['msg'];
        }
      },
      error: (err) => {
        console.error('Error uploading image:', err);
      }
    });
    this.getImages();
  }

  getImages(){
    this.isResponse = true;
    this.response = 'fetching';
    this.http.doGet(ConstantsService.GALLERY_URL+'/pics/details').subscribe({
      next:(res:any)=>{
        if(res['status']){
          this.imageData = res['data']
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.clearResponse();
  }

  clearResponse(){
    setTimeout(() => {
    this.isResponse = false;
    this.response = '';
    },3000);
  }
}
