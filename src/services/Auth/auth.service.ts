import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { LocalStorageService } from './localStorage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { server } from '../../environments/environment';
import { Router } from '@angular/router';
import { StorageService } from '../Storage/storage.service';
import { JWTStorage, UserStorage } from '../../config/storage.config';
import { UserService } from '../User/user.service';
import { UserAPIService } from '../User/user-api.service';
import { User } from '../../models/user.model';
//import { AppStorage, JWTStorage, ProjectStorage, UserStorage } from 'src/app/config/storage.config';
//import { UserService } from './user.service';
//import { User } from '../models/user.model';
//import { TabVersionenService } from './tabVersionen.service';


const API = 'auth'
const baseUrl = `${server.URL}/api/${API}`;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor( 
    private storageService:StorageService,
    private http: HttpClient,
    private router: Router,
    private userAPIService:UserAPIService) {
   
  }

  authUser(username:string, password:string): Observable<any> {
    const credentials = btoa(`${username}:${password}`); // Base64-Kodierung
    const headers = {
      Authorization: `Basic ${credentials}`
    };
    return this.http.get<any>(`${baseUrl}/authUser`, { headers });
  }

  loginUser(data:any){
    const decodedToken = this.jwtHelper.decodeToken(data.token);
    this.userAPIService.getUser(decodedToken).subscribe({
      next: async (user) => {
        await this.storageService.set(JWTStorage.JWT_TOKEN, data.token);  
        await this.storageService.set(UserStorage.CURRENT_USER, user); 
        this.isTokenValid().then((value) => {
          if(value){
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (e) => console.error(e)
    });
  }

  logoutUser(){
    this.storageService.remove(JWTStorage.JWT_TOKEN);  
    this.storageService.remove(UserStorage.CURRENT_USER); 
    this.router.navigate(['/login']);
  }

  async isTokenValid(): Promise<boolean> {
    const token = await this.getToken();
    if(token){
      if(!this.jwtHelper.isTokenExpired(token)){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    } 
  }
  async getToken(){ 
    return await this.storageService.get(JWTStorage.JWT_TOKEN);
  }

  /*
  isAuthenticatedUser(): boolean {
    return this.isTokenValid();
  }

  getToken(): string { 
    return this.localStorageService.getItem(JWTStorage.JWT_TOKEN);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if(token){
      if(!this.jwtHelper.isTokenExpired(token)){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    } 
  }

  loginUser(data:any){

    this.localStorageService.setItem(JWTStorage.JWT_TOKEN, data.token);
   
    const decodedToken = this.jwtHelper.decodeToken(data.token);
    this.localStorageService.removeItem(ProjectStorage.CURRENT_PROJECT_USER);
    this.localStorageService.removeItem(ProjectStorage.CURRENT_PROJECT);
    this.userService.get(decodedToken.username).subscribe({
      next: (data) => {
        this.setCurrentUser(data);
        this.setCurrentAppVersion();
        this.router.navigate(['/dashboard']);
      },
      error: (e) => console.error(e)
    });
  }

  setCurrentAppVersion(){
    this.tabVersionService.getCurrentVersion().subscribe({
      next: (data) => {  
        this.localStorageService.setItem(AppStorage.CURRENT_APP_VERSION,data);
      },
      complete:() => {
      },
      error: (e) => console.error(e)
    });
  }

  setCurrentUser(data:any){
    this.localStorageService.setItem(UserStorage.CURRENT_USER, JSON.stringify(data));
  }

  getCurrentUser():User{
    return JSON.parse(this.localStorageService.getItem(UserStorage.CURRENT_USER));
  }

  logoutUser(){
    this.currentUser = this.getCurrentUser();
    this.localStorageService.removeItem(JWTStorage.JWT_TOKEN);
    this.localStorageService.removeItem(UserStorage.CURRENT_USER);
    this.localStorageService.removeItem(ProjectStorage.CURRENT_PROJECT);
    this.localStorageService.removeItem(ProjectStorage.CURRENT_PROJECT_USER);
    if(this.currentUser){
      this.currentUser.nID_aktuellesProjekt = null;
      this.userService.update(this.currentUser.txtKuerzel,this.currentUser).subscribe({
        next: (data)=>{       
          this.router.navigate(['/login']);
        },
        error: (err)=> console.log(err)
      });
    }
  }

  isAdmin():boolean { 
    return this.getCurrentUser().isAdmin;
  }

  isProjektadmin():boolean { 
    return this.getCurrentUser().isProjektadmin;
  }
  */
}
