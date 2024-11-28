import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../utils/helper.service';
import { DataFetchService } from '../../utils/data-fetcher.service';
import { ConstantsService } from '../../utils/constants.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit{

  imageData:any = [];
  isResponse:boolean = false;
  response:string = '';
  imageSrc: string = "";
  image_name:string = '';
  picSrc:any=''
  isZoom:boolean = false;
  zoomPic:string = '';
  constructor(private help : HelperService,private http : DataFetchService){}
  ngOnInit(): void {
    this.getImages();
  }
  onChange(event: any) {
    this.imageSrc = event.target.files[0];
  }
  addImage(){
    let details = this.help.getData('details');
    const formData = new FormData();
    formData.append('username', details.username);
    formData.append('id', details._id);
    formData.append('img', this.imageSrc);
    formData.append('name',this.image_name);
    this.http.doPost(ConstantsService.GALLERY_URL+'/pics/add', formData).subscribe({
      next: (res: any) => {
        if(res['status']){
          this.isResponse = true;
          this.response = res['msg'];
          this.getImages();
          // this.imageData.push({'username':details.username,'id': details._id,'img':this.picSrc,'name':this.imageData})
        }
      },
      error: (err) => {
        console.error('Error uploading image:', err);
      }
    });
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

  zoomImage(src : string){
    this.zoomPic =  src;
    this.isZoom = true;
  }

  delImage(id : string){
    this.http.doDelete(ConstantsService.GALLERY_URL+'/pics/delete?id='+id).subscribe({
      next:(res:any)=>{
        if(res['status']){
          this.isResponse = true;
          this.response = 'Image Deleted Successfully';
          console.log(id);
          this.imageData = this.imageData.filter((ele :any)=>{ele['_id'] != id});
          console.log(this.imageData);
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.clearResponse();
  }
}
