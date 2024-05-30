import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { server } from '../../environments/environment';
import { DefWeekday } from '../../models/def-weekday.model';

const API = 'def_weekday'
const BASE_URL = `${server.URL}/api/${API}`;

@Injectable({
  providedIn: 'root'
})

export class DefWeekdayService {

  constructor(private http: HttpClient) {}

  /*----------------------------------------------------------------
  User API
  ----------------------------------------------------------------*/
  getAll(): Observable<DefWeekday[]> {
    return this.http.get<any[]>(BASE_URL);
  }
  get(value: DefWeekday): Observable<DefWeekday> {
    const ID = value.ID;
    return this.http.get<DefWeekday>(`${BASE_URL}/${ID}`);
  }
  create(data: DefWeekday): Observable<DefWeekday> {
    return this.http.post<DefWeekday>(BASE_URL, data);
  }
  update(value: DefWeekday, data: DefWeekday): Observable<DefWeekday> {
    const ID = value.ID;
    return this.http.put<DefWeekday>(`${BASE_URL}/${ID}`, data);
  }
  delete(value: DefWeekday): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${BASE_URL}/${ID}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(BASE_URL);
  }
}
