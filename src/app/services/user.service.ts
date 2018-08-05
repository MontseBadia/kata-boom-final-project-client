import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUserUrl = 'http://localhost:3000/user/me';

  constructor(private httpClient: HttpClient) { }

  getMyKatas(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUserUrl}/katas`, options)
      .toPromise();
  }
}
