import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { server } from '../../environments/environment';
import { DefTaskRepeat } from '../../models/def-task-repeat.model';
import { DefFamilyMemberType } from '../../models/def-family-member-type.model';

const DEF_TASK_REPEAT_API = 'def_task_repeat'
const DEF_TASK_REPEAT_BASE_URL = `${server.URL}/api/${DEF_TASK_REPEAT_API}`;

const DEF_FAMILY_MEMBER_TYPE_API = 'def_family_member_type'
const DEF_FAMILY_MEMBER_TYPE_API_BASE_URL = `${server.URL}/api/${DEF_FAMILY_MEMBER_TYPE_API}`;

@Injectable({
  providedIn: 'root'
})

export class DefAPIService {

  constructor(private http: HttpClient) {}

  /*----------------------------------------------------------------
  Def_Task_Repeat API
  ----------------------------------------------------------------*/
  getAllDefTaskRepeats(): Observable<DefTaskRepeat[]> {
    return this.http.get<DefTaskRepeat[]>(DEF_TASK_REPEAT_BASE_URL);
  }
  getDefTaskRepeat(value: DefTaskRepeat): Observable<DefTaskRepeat> {
    const ID = value.ID;
    return this.http.get<DefTaskRepeat>(`${DEF_TASK_REPEAT_BASE_URL}/${ID}`);
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
