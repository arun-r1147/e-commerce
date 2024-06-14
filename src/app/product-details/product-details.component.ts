import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.service';
import { CartService } from '../cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductDetailsService,
    private cartService: CartService
  ) {}
  private productSubscription!: Subscription;

  id = 0;
  ngOnInit(): void {
    this.productSubscription = this.route.params
      .pipe(
        switchMap((res) => {
          if (res) {
            return this.productService.getProductById(res['id']);
          }
          return of();
        })
      )
      .subscribe({
        next: (res) => {
          this.product = res;
        },
      });
  }

  addToCart() {
    this.cartService.addToCart({ ...this.product, count: 1 });
    alert(`${this.product.title} added to the cart`);
  }
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
