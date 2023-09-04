import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramadorRiegoService {

  private apiURL!: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = "http://127.0.0.1:8000/api/";
  }

  getPaginator(page: number, pageSize: number, idCliente: number, fieldName = '', search = ''): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    let url = this.apiURL+'programadoresRiego/' + idCliente + '?page=' + page + '&pageSize=' + pageSize;

    if(fieldName != '' && search != ''){
      url += '&fieldName=' + fieldName + '&search=' + search;
    }

    return this.httpClient.get(url,  {headers: headers});
  }

  getProgramadorRiego(id:any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    return this.httpClient.get(this.apiURL+'programadoresRiego/show/'+id,  {headers: headers});
  }

  addProgramadorRiego(programadorRiego: any): Observable<any> {
    let params = JSON.stringify(programadorRiego);
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    return this.httpClient.post(this.apiURL+'programadoresRiego/', params, {headers: headers});
  }

  deleteProgramadorRiego(id:any): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this.httpClient.delete(this.apiURL+'programadoresRiego/'+id, {headers:headers});
	}

}
