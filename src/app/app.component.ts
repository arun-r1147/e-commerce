import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ecommerce';
  count = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.count = this.cartService.getCartItems().length;
  }

  ngOnDestroy(): void {}
}
