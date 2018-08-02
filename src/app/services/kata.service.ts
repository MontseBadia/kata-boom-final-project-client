import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class KataService {

  baseKataUrl = 'http://localhost:3000/kata';
  baseUserUrl = 'http://localhost:3000/user/me';

  constructor(private httpClient: HttpClient) { }

  getRandom(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseKataUrl}/random`, options)
      .toPromise();
  }

  checkKata(inputCode, kataId): Promise<any> {
    const options = {
      withCredentials: true
    };
    const data = {
      inputCode
    };
    return this.httpClient.post(`${this.baseKataUrl}/${kataId}/check`, data, options)
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
    return this.httpClient.post(`${this.baseUserUrl}/katas`, data, options)
      .toPromise();
  }

}
