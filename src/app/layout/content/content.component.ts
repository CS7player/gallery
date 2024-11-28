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
  styleUrl: './content.component.css',
})
export class ContentComponent implements OnInit {
  imageData: any = [];
  isResponse: boolean = false;
  response: string = '';
  imageSrc: string = '';
  image_name: string = '';
  picSrc: any = '';
  isZoom: boolean = false;
  zoomPic: string = '';
  constructor(private help: HelperService, private http: DataFetchService) {}
  ngOnInit(): void {
    this.getImages();
  }
  onChange(event: any) {
    this.imageSrc = event.target.files[0];
  }
  addImage() {
    if (this.imageSrc == '') {
      this.alert('Select the Image!!!');
      return;
    }
    if (this.image_name.length == 0) {
      this.alert('Enter the Image Name!!!');
      return;
    }
    let details = this.help.getData('details');
    const formData = new FormData();
    formData.append('username', details.username);
    formData.append('id', details._id);
    formData.append('img', this.imageSrc);
    formData.append('name', this.image_name);
    this.http
      .doPost(ConstantsService.GALLERY_URL + '/pics/add', formData)
      .subscribe({
        next: (res: any) => {
          if (res['status']) {
            this.alert(res['msg']);
            // this.imageData.push({'username':details.username,'id': details._id,'img':this.picSrc,'name':this.imageData})
          }
        },
        error: (err) => {
          console.error('Error uploading image:', err);
        },
      });
  }

  getImages() {
    this.alert('Fetching Images');
    this.http.doGet(ConstantsService.GALLERY_URL + '/pics/details').subscribe({
      next: (res: any) => {
        if (res['status']) {
          this.imageData = res['data'];
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  zoomImage(src: string) {
    this.zoomPic = src;
    this.isZoom = true;
  }

  delImage(id: string) {
    this.http
      .doDelete(ConstantsService.GALLERY_URL + '/pics/delete?id=' + id)
      .subscribe({
        next: (res: any) => {
          if (res['status']) {
            this.alert('Image Deleted Successfully!!!');
            this.imageData = this.imageData.filter(
              (ele: any) => ele['_id'] != id
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  alert(alert: string) {
    this.isResponse = true;
    this.response = alert;
    setTimeout(() => {
      this.isResponse = false;
      this.response = '';
    }, 3000);
  }
}
