import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private apiURL!: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = "http://127.0.0.1:8000/api/";
  }

  getPaginator(page: number, pageSize: number, idProgramadorRiego: number, fieldName = '', search = ''): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    let url = this.apiURL+'sensores/' + idProgramadorRiego + '?page=' + page + '&pageSize=' + pageSize + '&idProgramadorRiego=' + idProgramadorRiego;

    if(fieldName != '' && search != ''){
      url += '&fieldName=' + fieldName + '&search=' + search;
    }

    return this.httpClient.get(url,  {headers: headers});
  }

  addSensor(sensor: any): Observable<any> {
    let params = JSON.stringify(sensor);
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    return this.httpClient.post(this.apiURL+'sensores/', params, {headers: headers});
  }

  deleteSensor(id:any): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this.httpClient.delete(this.apiURL+'sensores/'+id, {headers:headers});
	}

}
