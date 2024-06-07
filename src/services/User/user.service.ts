import { Injectable } from '@angular/core';
import { StorageService } from '../Storage/storage.service';
import { JWTStorage, UserStorage } from '../../config/storage.config';
import { User } from '../../models/user.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storageService: StorageService, private route: ActivatedRoute) { }

  getCurrentUserFromStorage(): Observable<User> {
    return this.storageService.get(UserStorage.CURRENT_USER);
  }

  getCurrentUserFromSnapshot(route: ActivatedRoute): User {
    return route.snapshot.data[UserStorage.CURRENT_USER] as User;
  }

  getCurrentUserIDFromStorage(): Observable<number>{
    return this.getCurrentUserFromStorage().pipe(
      map(user => user.ID!)
    );
  }
}