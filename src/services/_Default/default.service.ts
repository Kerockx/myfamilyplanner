import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { server } from '../../environments/environment';

const API = 'XXX'
const BASE_URL = `${server.URL}/api/${API}`;

@Injectable({
  providedIn: 'root'
})

export class DefaultService {

  constructor(private http: HttpClient) {}

  /*----------------------------------------------------------------
  User API
  ----------------------------------------------------------------*/
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL);
  }
  get(value: any): Observable<any> {
    const ID = value.ID;
    return this.http.get<any>(`${BASE_URL}/${ID}`);
  }
  create(data: any): Observable<any> {
    return this.http.post<any>(BASE_URL, data);
  }
  update(value: any, data: any): Observable<any> {
    const ID = value.ID;
    return this.http.put<any>(`${BASE_URL}/${ID}`, data);
  }
  delete(value: any): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${BASE_URL}/${ID}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(BASE_URL);
  }
}
