import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../types/product.types';


@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private httpclient: HttpClient) {}

  getAllProducts() {
    return this.httpclient.get<Products[]>('https://fakestoreapi.com/products');
  }

  getProductById(id: number) {
    return this.httpclient.get<Products>(`https://fakestoreapi.com/products/${id}`);
  }
}
