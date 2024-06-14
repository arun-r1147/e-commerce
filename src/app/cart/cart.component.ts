import { Component } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  count = 0;
  cartItems: {
    id: number;
    title: string;
    price: number;
    image: string;
    count: number;
  }[] = [];
  grandTotal = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  getTotalPrice(price: number, count: number) {
    return this.cartService.getTotalPrice(price, count);
  }

  getGrandTotal() {
    return this.cartService.calculateGrandTotal();
  }

  updateQuantity(product: any) {
    this.cartService.addToCart(product);
  }

  

}
