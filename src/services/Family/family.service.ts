import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { Family } from '../../models/family.model';
import { FamilyMember } from '../../models/family-member.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class FamilyService {
  
  db:any;
  private familyCollection: AngularFirestoreCollection<Family> = this.firestore.collection<Family>('familys');
  private familyMemberCollection: AngularFirestoreCollection<FamilyMember> = this.firestore.collection<FamilyMember>('family-members');

  constructor(private firestore: AngularFirestore) {
   
  }

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

  create(data: Family): Observable<Family> {
    const doc = { ...data };
    return from(this.familyCollection.add(doc)).pipe(
      switchMap(() => of(data)),
      catchError(error => {
        throw new Error('Failed to create user: ' + error);
      })
    );
  }

  
  
  getAll(): Observable<Family[]> {
   return this.familyCollection.valueChanges({ idField: 'ID' });
  }

  getAllFamilyMembers(): Observable<FamilyMember[]> {
    return this.familyMemberCollection.valueChanges({ idField: 'ID' });
   }

  get(uid:string): Observable<Family | null>{ 
    
    return from(this.familyCollection.ref.where('uid', '==', uid).limit(1).get()).pipe(
      map(snapshot => {
        if (!snapshot.empty) {
          return snapshot.docs[0].data();
        } else {
          return null;
        }
      })
    );
  }

}
