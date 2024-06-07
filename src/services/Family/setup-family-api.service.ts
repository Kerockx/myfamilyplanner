import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom, map } from 'rxjs';
import { server } from '../../environments/environment';
import { Family } from '../../models/family.model';
import { FamilyMember } from '../../models/family-member.model';
import { DefFamilyMemberType } from '../../models/def-family-member-type.model';
import { UserService } from '../User/user.service';
import { User } from '../../models/user.model';
import { SetupFamilyData } from '../../interfaces/setup-family-data.interface';

const API = 'setup_family'
const BaseUrl = `${server.URL}/api/${API}`;

@Injectable({
  providedIn: 'root'
})


export class SetupFamilyAPIService {

  constructor(private http: HttpClient,private userService:UserService) {}

  public setupFamily(data: SetupFamilyData): Observable<Family> {
    return this.http.post<Family>(`${BaseUrl}`, data);
  }

}
