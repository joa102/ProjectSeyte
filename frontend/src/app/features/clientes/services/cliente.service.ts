import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiURL!: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = "http://127.0.0.1:8000/api/";
  }

  getPaginator(page: number, pageSize: number, fieldName = '', search = ''): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    let url = this.apiURL+'clientes?page=' + page + '&pageSize=' + pageSize;

    if(fieldName != '' && search != ''){
      url += '&fieldName=' + fieldName + '&search=' + search;
    }

    return this.httpClient.get(url,  {headers: headers});
  }

  getCliente(id:any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    return this.httpClient.get(this.apiURL+'clientes/'+id,  {headers: headers});
  }

  addCliente(cliente: any): Observable<any> {
    let params = JSON.stringify(cliente);
    let headers = new HttpHeaders().set('Content-Type', 'aplication/json');

    return this.httpClient.post(this.apiURL+'clientes/', params, {headers: headers});
  }

  updateCliente(cliente: Cliente): Observable<any>{
		let params = JSON.stringify(cliente);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this.httpClient.put(this.apiURL+'clientes/'+cliente.id, params, {headers:headers});
	}

  deleteClient(id:any): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this.httpClient.delete(this.apiURL+'clientes/'+id, {headers:headers});
	}

}
