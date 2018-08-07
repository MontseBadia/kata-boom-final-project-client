import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class KataService {

  // baseKataUrl = 'http://localhost:3000/kata';
  private baseKataUrl = environment.apiUrl + '/kata';

  constructor(private httpClient: HttpClient) { }

  getRandom(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseKataUrl}/random`, options)
      .toPromise();
  }

  getOne(name): Promise<any> {
    const options = {
      withCredentials: true
    };
    const data = {
      name: name.name,
    };
    return this.httpClient.get(`${this.baseKataUrl}/${data.name}`, options)
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

}
