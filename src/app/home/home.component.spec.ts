import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { ProductDetailsService } from '../product-details/product-details.service';
import { CategoryService } from '../category/category.service';
import { Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';

xdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productServiceMock: any;
  let categoryServiceMock: any;
  let routerMock: any;

  let router: Router;

  beforeEach(async () => {
    productServiceMock = {
      getAllProducts: jasmine.createSpy('getAllProduts').and.returnValue(
        of([
          {
            id: 1,
            title: 'Product 1',
            price: 100,
            image: 'image1.jpg',
            category: 'Category 1',
            description: 'Description 1',
            rating: { rate: 4.5, count: 10 },
          },
          {
            id: 2,
            title: 'Product 2',
            price: 200,
            image: 'image2.jpg',
            category: 'Category 2',
            description: 'Description 2',
            rating: { rate: 4.0, count: 20 },
          },
        ])
      ),
    };

    categoryServiceMock = {
      getCategories: jasmine
        .createSpy('getCategories')
        .and.returnValue(of(['category 1', 'category 2'])),
    };

    routerMock = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ProductDetailsService, useValue: productServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router); // Inject the router
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should populate products and categories on initialization', () => {
    expect(component.products.length).toBe(2);
    expect(component.products[0].title).toBe('Product 1');
    expect(component.categories.length).toBe(2);
    expect(component.categories[0]).toBe('category 1');
  });
});
