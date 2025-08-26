import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable()
export class ProductService {

  constructor(private http:HttpClient) {}

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCTS}`).pipe(shareReplay(1));
  }
}
