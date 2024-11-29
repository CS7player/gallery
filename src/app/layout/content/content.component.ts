import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class ContentComponent implements OnInit,OnChanges {

  imageData: any = [];
  selectedFile : any = null;
  isResponse: boolean = false;
  response: string = '';
  imageSrc: string = '';
  image_name: string = '';
  isZoom: boolean = false;
  display_image : string = '';
  @Input() userid = '';
  constructor(private help: HelperService, private http: DataFetchService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userid']) {
      this.getImages(this.userid);
    }
  }
  ngOnInit(): void {
    this.getImages(this.userid);
  }
  onChange(event: any) {
    this.imageSrc = event.target.files[0];
    const file : any = this.imageSrc
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
         this.display_image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
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
            this.imageData.push({'_id':res['data']['insertedId'],'username':details.username,'id': details._id,'image':this.display_image,'name':this.image_name})
            this.image_name = '';
            this.selectedFile = null;
          }
        },
        error: (err) => {
          console.error('Error uploading image:', err);
        },
      });
  }

  getImages(id : string) {
    this.alert('Fetching Images');
    this.http.doGet(ConstantsService.GALLERY_URL + '/pics/details?id='+id).subscribe({
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
    this.display_image = src;
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
