import { Injectable } from '@angular/core';
import { UserProfileData } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private TOKEN_KEY = '$SHARIKEK_ACCESS_TOKEN$';
  private USER_KEY = '$SHARIKEK_USER$';

  public setUser(user: UserProfileData | undefined): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Get session user data
  public getUser(): UserProfileData {
    return JSON.parse(localStorage.getItem(this.USER_KEY) as string);
  }
  // Store token securely
  public setToken(token: string | undefined): void {
    localStorage.setItem(this.TOKEN_KEY, token as string);
  }
  // Retrieve token
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  // Remove token
  public clearSession(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) ? true : false;
  }
}
