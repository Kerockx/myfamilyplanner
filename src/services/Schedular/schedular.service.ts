import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { server } from '../../environments/environment';
import { DefDaytime } from '../../models/def-daytime.model';
import { SchedularListItem } from '../../models/schedular-list-item.model';

const daytimeAPI = 'def_daytime'
const daytimeBaseUrl = `${server.URL}/api/${daytimeAPI}`;


@Injectable({
  providedIn: 'root'
})

export class SchedularService {

  constructor(private http: HttpClient) {}

  getAllDefDaytime(): Observable<SchedularListItem[]> {
    return this.http.get<any[]>(daytimeBaseUrl);
  }

}
