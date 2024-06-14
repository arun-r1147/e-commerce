import { Injectable, OnInit } from '@angular/core';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private cart: {
    id: number;
    title: string;
    price: number;
    image: string;
    count: number;
  }[] = [];
  total = 0;
  cartCount = 0;
  constructor() {}
  ngOnInit(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  getCartItems() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
    return this.cart;
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      const index = this.cart.findIndex((i) => i.id === product.id);
      existingProduct.count += 1;
      this.cart[index] = { ...product, count: existingProduct.count };
    } else {
      this.cart.push({ ...product, count: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(product: any) {
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const existingProduct = this.cart[index];
      if (existingProduct.count > 1) {
        existingProduct.count--;
      } else {
        this.cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  clearCart() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getTotalPrice(price: number, count: number) {
    this.total = price * count;
    return price * count;
  }

  calculateGrandTotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  }
}
