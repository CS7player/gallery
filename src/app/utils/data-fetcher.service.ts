import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from './helper.service';

@Injectable({
 providedIn: 'root'
})
export class DataFetchService {
 constructor(private _http: HttpClient, private readonly help: HelperService) { }
 doGet(url: string) {
  return this._http.get(url,this.getToken());
 }
 doPost(url: string, data: any) {
  return this._http.post(url, data, this.getToken());
 }

 doPut(url:string,data: any){
    return this._http.put(url,data,this.getToken());
 }

 doDelete(url : string){
  return this._http.delete(url,this.getToken());
 }

 getToken() {
  let data = this.help.getData('token');
  if (data) {
   return { 'headers': new HttpHeaders({ 'Authorization': 'Basic ' + data, 'responseType': 'json' }) };
  } else {
   return { headers: new HttpHeaders() };
  }
 }
}