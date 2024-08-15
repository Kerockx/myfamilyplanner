import { Injectable } from '@angular/core';
import { GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, getAuth, getRedirectResult, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';


import { User as AuthUser } from '@firebase/auth-types'; // Import User type from AngularFire
import { HelperService } from '../Helper/helper.service';
import { UserService } from '../User/user.service';
import { StorageService } from '../Storage/storage.service';
import { User } from '../../models/user.model';
import { UserAPIService } from '../User/user-api.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private userAPIService:UserAPIService, private helperService:HelperService, private userService:UserService, private storageService:StorageService) { }

  
  onAuthStateChanged(): Observable<any>{
    return new Observable(observer => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          observer.next(user);
          observer.complete();
        } else {
          observer.next(null);
          observer.complete();
        }
      });
      /*
      this.afAuth.authState.subscribe((authUser: AuthUser | null) => {
        if (authUser) {
          let user = this.userService.getCurrentUserFromStorage();
          observer.next(user);
          observer.complete();
        } else {
          observer.next(null);
          observer.complete();
        }
      });
      */
    });
  }

  getRedirectResult(): Observable<any>{
    const x = this.onAuthStateChanged();
    return new Observable(observer => {
      const auth = getAuth();
      getRedirectResult(auth)
        .then((result) => {
          if(result){
            observer.next(result.user);
            observer.complete();
          }else{
            observer.next(null);
            observer.complete();
          }
        })
        .catch((error) => {
          console.log(error);
          observer.error(error);
        });
    });
  }

  createUserWithEmailAndPassword(email:string,password:string):Observable<User|null>{
      const username = 'User-'+this.helperService.generateRandom7DigitNumber();
      const auth = getAuth();

      return new Observable(observer => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((auth:UserCredential) => {
            let user = new User();
            user.txt_name = username;
            user.email = email;
            user.ID = auth.user.uid;

            this.sendEmailVerification(email).subscribe({
              next: (result) => {
                this.userAPIService.createUser(user).subscribe({
                  next: (user) => {
                    if(user){
                      this.storageService.set('user', user);
                      observer.next(user);
                      observer.complete();
                    }else{
                      this.storageService.remove('user');
                      observer.next(null);
                      observer.complete();
                    }
                  },
                  error: (e) => {
                    console.error(e)
                    observer.next(null);
                    observer.complete();
                  }
                });
              },
              error: (e) => {
                console.error(e)
                observer.next(null);
                observer.complete();
              }
            });

           
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            observer.next(null);
            observer.complete();
          });
      });
  }

  sendEmailVerification(email:string): Observable<any>{
    const user = getAuth().currentUser;
    return new Observable(observer => {
      if(user){
      sendEmailVerification(user)
        .then(() => {
          window.localStorage.setItem('emailForSignIn', email);
          observer.next(true);
          observer.complete();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          observer.next(false);
          observer.complete();
        });
      }else{
        observer.next(false);
        observer.complete();
      }
    })
  }

  sendPasswordResetEmail(email:string): Observable<boolean>{
    const auth = getAuth();
  
    return new Observable(observer => {
      sendPasswordResetEmail(auth, email)
      .then(function() {
        // Passwort-Wiederherstellungs-E-Mail wurde gesendet
        console.log('Eine E-Mail zur Passwortwiederherstellung wurde an Ihre E-Mail-Adresse gesendet.');
        observer.next(true);
        observer.complete();
      })
      .catch(function(error) {
        // Fehler bei der Passwortwiederherstellung
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode, errorMessage);
        observer.next(false);
        observer.complete();
      });
    });
  }

  signOut(): Observable<boolean>{
    return new Observable(observer => {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.storageService.remove('user');
        observer.next(true);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  signInWithEmailAndPassword(email:string,password:string):Observable<User | null>{
    return new Observable(observer => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        this.userAPIService.getUser(auth.user.uid).subscribe({
          next: (user) => {
            if(user){
              this.storageService.set('user', user);
              observer.next(user);
              observer.complete();
            }else{
              this.storageService.remove('user');
              observer.next(null);
              observer.complete();
            }
          },
          error: (e) => console.error(e)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        observer.next(null);
        observer.complete();
      });
    });
  }

  signUpWithGoogle():void{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  }
}
