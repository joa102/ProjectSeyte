import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiURL!: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = "http://127.0.0.1:8000/api/";
  }

  search(modelName: string, fieldName: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    return this.httpClient.get(this.apiURL+'search?modelName=' + modelName + '&fieldName=' + fieldName,  {headers: headers});
  }

}
