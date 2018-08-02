import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class KataService {

  baseUrl = 'http://localhost:3000/kata';

  constructor(private httpClient: HttpClient) { }

  getRandom(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/random`, options)
      .toPromise();
  }

}
