import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUserUrl = 'http://localhost:3000/user';

  constructor(private httpClient: HttpClient) { }

  getMyKatas(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUserUrl}/me/katas`, options)
      .toPromise();
  }

  submitKata(inputCode, kataId): Promise<any> {
    const options = {
      withCredentials: true
    };
    const data = {
      inputCode,
      kataId
    };
    return this.httpClient.post(`${this.baseUserUrl}/me/katas`, data, options)
      .toPromise();
  }

  getOneByName(userName): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUserUrl}/search/${userName}`, options)
      .toPromise();
  }

  addOneFriend(userId): Promise<any> {
    const options = {
      withCredentials: true
    };
    const data = {};
    return this.httpClient.post(`${this.baseUserUrl}/add/${userId}`, data, options)
      .toPromise();
  }

  getMyFriends(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUserUrl}/me/friends`, options)
      .toPromise();
  }

  // getMyKataSolution(kataId): Promise<any> {
  //   const options = {
  //     withCredentials: true
  //   };
  //   return this.httpClient.get(`${this.baseUserUrl}/me/katas/${kataId}/edit`, options)
  //     .toPromise();
  // }

}
