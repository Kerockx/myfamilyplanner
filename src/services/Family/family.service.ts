import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Family } from '../../models/family.model';
import { FamilyMember } from '../../models/family-member.model';

@Injectable({
  providedIn: 'root'
})

export class FamilyService {

  constructor() {}

  private _currentFamily: Family | undefined
  public get currentFamily(): Family | undefined {
      return this._currentFamily
  }
  public set currentFamily(value: Family) {
      this._currentFamily = value
  }
  private _familyMembers: FamilyMember[] | undefined
  public get familyMembers(): FamilyMember[] | undefined {
      return this._familyMembers
  }
  public set familyMembers(value: FamilyMember[]) {
      this._familyMembers = value
  }

}
