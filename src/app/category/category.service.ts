import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../types/product.types';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get<string[]>(
      'https://fakestoreapi.com/products/categories'
    );
  }
  getCategoriesByName(name: string) {
    return this.httpClient.get<Products[]>(
      `https://fakestoreapi.com/products/category/${name}`
    );
  }
}
