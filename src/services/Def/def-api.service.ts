import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { server } from '../../environments/environment';
import { DefTaskRepeat } from '../../models/def-task-repeat.model';
import { DefFamilyMemberType } from '../../models/def-family-member-type.model';
import { DefActivity } from '../../models/def-activity.model';
import { DefActivityCategory } from '../../models/def-activity-category.model';

const DEF_TASK_REPEAT_API = 'def_task_repeat'
const DEF_TASK_REPEAT_BASE_URL = `${server.URL}/api/${DEF_TASK_REPEAT_API}`;

const DEF_FAMILY_MEMBER_TYPES_API = 'def_family_member_types'
const DEF_FAMILY_MEMBER_TYPES_API_BASE_URL = `${server.URL}/api/${DEF_FAMILY_MEMBER_TYPES_API}`;

const DEF_ACTIVITIES_API = 'def_activities'
const DEF_ACTIVITIES_API_BASE_URL = `${server.URL}/api/${DEF_ACTIVITIES_API}`;

const DEF_ACTIVITY_API_CATEGORIES = 'def_activity_categories'
const DEF_ACTIVITY_CATEGORIES_API_BASE_URL = `${server.URL}/api/${DEF_ACTIVITY_API_CATEGORIES}`;

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
    return this.http.get<DefFamilyMemberType[]>(DEF_FAMILY_MEMBER_TYPES_API_BASE_URL);
  }
  getDefFamilyMemberTypes(value: DefFamilyMemberType): Observable<DefFamilyMemberType> {
    const ID = value.ID;
    return this.http.get<DefFamilyMemberType>(`${DEF_FAMILY_MEMBER_TYPES_API_BASE_URL}/${ID}`);
  }

  /*----------------------------------------------------------------
  Def_Activity API
  ----------------------------------------------------------------*/
  getAllDefActivities(): Observable<DefActivity[]> {
    return this.http.get<DefActivity[]>(`${DEF_ACTIVITIES_API_BASE_URL}`);
  }
  getAllDefMainActivyties(): Observable<DefActivity[]> {
    return this.http.get<DefActivity[]>(`${DEF_ACTIVITIES_API_BASE_URL}/mainActivity`);
  }

  /*----------------------------------------------------------------
  Def_Activity_Category API
  ----------------------------------------------------------------*/
  getAllDefActivityCategories(): Observable<DefActivityCategory[]> {
    return this.http.get<DefActivityCategory[]>(`${DEF_ACTIVITY_CATEGORIES_API_BASE_URL}`);
  }
  getAllDefMainActivityCategories(): Observable<DefActivityCategory[]> {
    return this.http.get<DefActivityCategory[]>(`${DEF_ACTIVITY_CATEGORIES_API_BASE_URL}/mainActivity`);
  }
  
}
