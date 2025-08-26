import { Injectable } from '@angular/core';
import { API_CONFIG } from '../core/config/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http :HttpClient) {}

  login(credential:string) {
    return this.http.post(`${API_CONFIG.BASE_URL}${API_CONFIG.LOGIN}`,credential)
  }

}
