import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { server } from '../../environments/environment';
import { Family } from '../../models/family.model';
import { FamilyMember } from '../../models/family-member.model';
import { DefFamilyMemberType } from '../../models/def-family-member-type.model';

const familyAPI = 'tab_familys'
const familyBaseUrl = `${server.URL}/api/${familyAPI}`;

const familyMemberAPI = 'tab_family_members'
const familyMemberBaseUrl = `${server.URL}/api/${familyMemberAPI}`;

const devFamilyMemberTypeAPI = 'def_family_member_type'
const DEF_FAMILY_MEMBER_TYPE_API_BASE_URL = `${server.URL}/api/${devFamilyMemberTypeAPI}`;

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
  Def_Family_Member_Type API
  ----------------------------------------------------------------*/
  getAllDefFamilyMemberTypes(): Observable<DefFamilyMemberType[]> {
    return this.http.get<DefFamilyMemberType[]>(DEF_FAMILY_MEMBER_TYPE_API_BASE_URL);
  }
  getDefFamilyMemberTypes(value: DefFamilyMemberType): Observable<DefFamilyMemberType> {
    const ID = value.ID;
    return this.http.get<DefFamilyMemberType>(`${DEF_FAMILY_MEMBER_TYPE_API_BASE_URL}/${ID}`);
  }

}
