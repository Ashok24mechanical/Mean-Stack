import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }
  apiForGet = 'http://localhost:8080/GetData'
  apiForPost = 'http://localhost:8080/PostData'
  apiForPut = 'http://localhost:8080/UpdateData/'
  apiForDelete = 'http://localhost:8080/DeleteData/'

  getdata() {
    return this.http.get(this.apiForGet).pipe(map(res => {
      return res;
    }));
  }
  postdata(data: string) {
    return this.http.post(this.apiForPost, data).pipe(map(res => {
      return res;
    }));
  }
  updatedata(id: any, data: string) {
    return this.http.put(this.apiForPut + id, data).pipe(map(res => {
      return res;
    }));
  }
  deletedata(id: any) {
    return this.http.delete(this.apiForDelete+id).pipe(map(res => {
      return res;
    }));
  };
}
