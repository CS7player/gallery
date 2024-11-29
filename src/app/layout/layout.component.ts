import { Component, OnInit } from '@angular/core';
import { DataFetchService } from '../utils/data-fetcher.service';
import { ConstantsService } from '../utils/constants.service';
import { HelperService } from '../utils/helper.service';
import { Router } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";

@Component({
 selector: 'app-layout',
 standalone: true,
 imports: [MenuComponent],
 templateUrl: './layout.component.html',
 styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
 username: string = '';
 constructor(private http: DataFetchService, private help: HelperService, private router: Router) { }
 ngOnInit(): void {
  this.username = this.help.getData('details')['username'];
 }

 logout() {
  this.http.doDelete(ConstantsService.GALLERY_URL + "/user/logout").subscribe({
   next: (res: any) => {
    if (res['status']) {
     this.help.clearAll();
     this.router.navigate([''])
    }
   },
   error: (error) => {
    console.log(error)
   }
  })
 }
}
