import { Injectable } from '@angular/core';
import { DefTaskRepeat } from '../../models/def-task-repeat.model';
import { DefFamilyMemberType } from '../../models/def-family-member-type.model';
import { ActivatedRoute } from '@angular/router';
import { DefStorage, FamilyStorage } from '../../config/storage.config';
import { DefActivity } from '../../models/def-activity.model';
import { DefActivityCategory } from '../../models/def-activity-category.model';
import { DEF_ACTIVITY_CATEGORIES } from '../../config/database.config';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefService {

  constructor(private activatedRoute: ActivatedRoute) { }

  private _defTaskRepeats: DefTaskRepeat[] | undefined;
  public get defTaskRepeats(): DefTaskRepeat[] | undefined {
    return this._defTaskRepeats;
  }
  public set defTaskRepeats(value: DefTaskRepeat[]) {
    this._defTaskRepeats = value;
  }

  private _defFamilyMemberTypes: DefFamilyMemberType[] | undefined;
  public get defFamilyMemberTypes(): DefFamilyMemberType[] | undefined {
    return this._defFamilyMemberTypes;
  }
  public set defFamilyMemberTypes(value: DefFamilyMemberType[]) {
    this._defFamilyMemberTypes = value;
  }

  private _defActivityCategories: DefActivityCategory[] | undefined;
  public get defActiviyCategories(): DefActivityCategory[] | undefined {
    return this._defActivityCategories;
  }
  public set defActiviyCategories(value: DefActivityCategory[]) {
    this._defActivityCategories = value;
  }

  getAllDefFamilyMemberTypes(route:ActivatedRoute): Observable<DefFamilyMemberType[]> {
    return of(route.snapshot.data[FamilyStorage.DEF_FAMILY_MEMBER_TYPES] as DefFamilyMemberType[]);
  }

  getAllDefActivities(route:ActivatedRoute): Observable<DefActivity[]> {
    return of(route.snapshot.data[DefStorage.DEF_ACTIVITIES] as DefActivity[]);
  }

  getAllDefActivityCategories(route:ActivatedRoute): Observable<DefActivityCategory[]> {
    return of(route.snapshot.data[DefStorage.DEF_ACTIVITY_CATEGORIES] as DefActivityCategory[]);
  }

  getAllDefMainActivities(route:ActivatedRoute): Observable<DefActivity[]> {
    return of(route.snapshot.data[DefStorage.DEF_ACTIVITIES] as DefActivity[])
    .pipe(
        map((activities: DefActivity[]) => activities.filter(activity => activity.nID_activity_category === DEF_ACTIVITY_CATEGORIES.MAIN_ACTIVITIES_ID))
    );
   
  }
}