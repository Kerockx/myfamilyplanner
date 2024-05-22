import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { server } from '../../environments/environment';
import { Family } from '../../models/family.model';
import { FamilyMember } from '../../models/family-member.model';
import { FamilyMemberDef } from '../../models/family-member-def.model';

const familyAPI = 'tab_familys'
const familyBaseUrl = `${server.URL}/api/${familyAPI}`;

const familyMemberAPI = 'tab_family_members'
const familyMemberBaseUrl = `${server.URL}/api/${familyMemberAPI}`;

const familyMemberDefAPI = 'def_family_member'
const familyMemberDefBaseUrl = `${server.URL}/api/${familyMemberDefAPI}`;

@Injectable({
  providedIn: 'root'
})


export class FamilyAPIService {

  constructor(private http: HttpClient) {}

  /*----------------------------------------------------------------
  Family API
  ----------------------------------------------------------------*/
  getAllFamilys(): Observable<Family[]> {
    return this.http.get<Family[]>(familyBaseUrl);
  }
  getFamily(value: Family): Observable<Family> {
    const ID = value.ID;
    return this.http.get<Family>(`${familyBaseUrl}/${ID}`);
  }
  createFamily(data: Family): Observable<Family> {
    return this.http.post<Family>(familyBaseUrl, data);
  }
  updateFamily(value: Family, data: Family): Observable<Family> {
    const ID = value.ID;
    return this.http.put<Family>(`${familyBaseUrl}/${ID}`, data);
  }
  deleteFamily(value: Family): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${familyBaseUrl}/${ID}`);
  }
  deleteAllFamilys(): Observable<any> {
    return this.http.delete(familyBaseUrl);
  }

  /*----------------------------------------------------------------
  FamilyMember API
  ----------------------------------------------------------------*/
  getAllFamilyMembers(): Observable<FamilyMember[]> {
    return this.http.get<FamilyMember[]>(familyMemberBaseUrl);
  }
  getAllFamilyMembersByFamily(value:Family): Observable<FamilyMember[]> {
    const ID = value.ID;
    return this.http.get<FamilyMember[]>(`${familyMemberBaseUrl}/family/${ID}`);
  }
  getFamilyMember(value: FamilyMember): Observable<FamilyMember> {
    const ID = value.ID;
    return this.http.get<FamilyMember>(`${familyMemberBaseUrl}/${ID}`);
  }
  createFamilyMember(data: FamilyMember): Observable<FamilyMember> {
    return this.http.post<FamilyMember>(familyMemberBaseUrl, data);
  }
  updateFamilyMember(value: FamilyMember, data: FamilyMember): Observable<FamilyMember> {
    const ID = value.ID;
    return this.http.put<FamilyMember>(`${familyMemberBaseUrl}/${ID}`, data);
  }
  deleteFamilyMember(value: FamilyMember): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${familyMemberBaseUrl}/${ID}`);
  }
  deleteAllFamilyMembers(): Observable<any> {
    return this.http.delete(familyMemberBaseUrl);
  }

  /*----------------------------------------------------------------
  FamilyMemberDef API
  ----------------------------------------------------------------*/
  getAllFamilyMemberDefs(): Observable<FamilyMemberDef[]> {
    return this.http.get<FamilyMemberDef[]>(familyMemberDefBaseUrl);
  }
  getFamilyMemberDef(value: FamilyMemberDef): Observable<FamilyMemberDef> {
    const ID = value.ID;
    return this.http.get<FamilyMemberDef>(`${familyMemberDefBaseUrl}/${ID}`);
  }
  createFamilyDef(data: FamilyMemberDef): Observable<FamilyMemberDef> {
    return this.http.post<FamilyMemberDef>(familyMemberDefBaseUrl, data);
  }
  updateFamilyMemberDef(value: FamilyMemberDef, data: FamilyMemberDef): Observable<FamilyMemberDef> {
    const ID = value.ID;
    return this.http.put<FamilyMemberDef>(`${familyMemberDefBaseUrl}/${ID}`, data);
  }
  deleteFamilyMemberDef(value: FamilyMemberDef): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${familyMemberDefBaseUrl}/${ID}`);
  }
  deleteAllFamilyMemberDefs(): Observable<any> {
    return this.http.delete(familyMemberDefBaseUrl);
  }
}
