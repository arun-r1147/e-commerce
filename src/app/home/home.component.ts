import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductDetailsService } from '../product-details/product-details.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: { id: number; title: string; price: number; image: string }[] = [];
  categories: string[] = [];

  constructor(
    private productService: ProductDetailsService,
    private categoryService: CategoryService,
    private router:Router
  ) {}
  private productsSubscription!: Subscription;

  ngOnInit(): void {
    this.productsSubscription = this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
    });
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;

    // Navigate to the selected category route
    this.router.navigate(['/products/category', selectedCategory]);
  }
}
