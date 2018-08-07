import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // private baseUrl = 'http://localhost:3000/auth';
  private baseUrl = environment.apiUrl + '/auth';

  private user: any;
  private userChange: Subject<any> = new Subject();

  userChange$: Observable<any> = this.userChange.asObservable();

  constructor(private httpClient: HttpClient) { }

  private setUser(user?: any) { // Why private?
    this.user = user;
    this.userChange.next(user);
    return user;
  }

  getUser(): any {
    return this.user;
  }

  signup(username: string, password: string): Promise<any> {
    const options = {
      withCredentials: true
    };
    const data = { username, password };
    return this.httpClient.post(`${this.baseUrl}/signup`, data, options)
      .toPromise()
      .then((user) => this.setUser(user)); // Why does it work without this? Why do we need it here if it is already set while doing me()?
  }

  login(username: string, password: string): Promise<any> {
    const options = {
      withCredentials: true
    };
    const data = { username, password };
    return this.httpClient.post(`${this.baseUrl}/login`, data, options)
      .toPromise()
      .then((user) => this.setUser(user)); // Why with data instead of user did not work?
  }

  me(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/me`, options)
      .toPromise()
      .then((user) => this.setUser(user))
      .catch((err) => {
        if (err.status === 404) {
          this.setUser();
          return null;
        } else {
          Promise.reject(new Error('unexpected error'));
        }
      });
  }

  logout(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/logout`, {}, options)
      .toPromise()
      .then(() => this.setUser());
  }

}
