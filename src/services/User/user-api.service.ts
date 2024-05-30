import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { server } from '../../environments/environment';
import { User } from '../../models/user.model';

const userAPI = 'tab_users'
const userBaseUrl = `${server.URL}/api/${userAPI}`;

@Injectable({
  providedIn: 'root'
})


export class UserAPIService {

  constructor(private http: HttpClient) {}

  /*----------------------------------------------------------------
  User API
  ----------------------------------------------------------------*/
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(userBaseUrl);
  }
  getUser(value: User): Observable<User> {
    const ID = value.ID;
    return this.http.get<User>(`${userBaseUrl}/${ID}`);
  }
  createUser(data: User): Observable<User> {
    return this.http.post<User>(userBaseUrl, data);
  }
  updateUser(value: User, data: User): Observable<User> {
    const ID = value.ID;
    return this.http.put<User>(`${userBaseUrl}/${ID}`, data);
  }
  deleteUser(value: User): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${userBaseUrl}/${ID}`);
  }
  deleteAllUser(): Observable<any> {
    return this.http.delete(userBaseUrl);
  }

}