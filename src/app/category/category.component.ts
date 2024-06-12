import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from '../product-details/product-details.service';
import { Subscription } from 'rxjs';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  category: string = '';
  products: { id: number; title: string; price: number; image: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}
  private productsSubscription!: Subscription;

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('name')!;
    this.productsSubscription = this.categoryService
      .getCategoriesByName(this.category)
      .subscribe({
        next: (res) => {
          if (res) {
            this.products = res;
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
