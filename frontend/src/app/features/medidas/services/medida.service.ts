import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  private apiURL!: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = "http://127.0.0.1:8000/api/";
  }

  getPaginator(page: number, pageSize: number, idSensor: number, fieldName = '', search = ''): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    let url = this.apiURL+'medidas/' + idSensor + '?page=' + page + '&pageSize=' + pageSize + '&idSensor=' + idSensor;

    if(fieldName != '' && search != ''){
      url += '&fieldName=' + fieldName + '&search=' + search;
    }

    return this.httpClient.get(url,  {headers: headers});
  }

  addMedida(medida: any): Observable<any> {
    let params = JSON.stringify(medida);
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    return this.httpClient.post(this.apiURL+'medidas/', params, {headers: headers});
  }

  deleteMedida(id:any): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this.httpClient.delete(this.apiURL+'medidas/'+id, {headers:headers});
	}

}
