import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { server } from '../../environments/environment';
import { Router } from '@angular/router';
import { StorageService } from '../Storage/storage.service';
import { JWTStorage, UserStorage } from '../../config/storage.config';
import { UserService } from '../User/user.service';
import { UserAPIService } from '../User/user-api.service';
import { User } from '../../models/user.model';

const API = 'auth'
const baseUrl = `${server.URL}/api/${API}`;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor( 
    private storageService: StorageService,
    private http: HttpClient,
    private router: Router,
    private userAPIService: UserAPIService
  ) { }
   
  authUser(username: string, password: string): Observable<any> {
    const credentials = btoa(`${username}:${password}`); // Base64 encoding
    const headers = {
      Authorization: `Basic ${credentials}`
    };
    return this.http.get<any>(`${baseUrl}/authUser`, { headers });
  }

  async loginUser(data: any) {
    const decodedToken = this.jwtHelper.decodeToken(data.token);
    const user = await firstValueFrom(this.userAPIService.getUser(decodedToken));
    await this.storageService.set(JWTStorage.JWT_TOKEN, data.token);  
    await this.storageService.set(UserStorage.CURRENT_USER, user); 
    const isValidToken = await this.isTokenValid();
    if (isValidToken) {
      this.router.navigate(['/dashboard']);
    }
  }

  logoutUser() {
    this.storageService.remove(JWTStorage.JWT_TOKEN);  
    this.storageService.remove(UserStorage.CURRENT_USER); 
    this.router.navigate(['/login']);
  }

  async isTokenValid(): Promise<boolean> {
    const token = await this.getToken(); // Use await to get the token
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  async getToken(): Promise<string | null> {
    const tokenObservable = this.storageService.get(JWTStorage.JWT_TOKEN);
    const token = await firstValueFrom(tokenObservable);
    return token as string | null;
  }
}