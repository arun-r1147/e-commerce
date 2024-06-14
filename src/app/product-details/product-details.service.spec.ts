import { TestBed } from '@angular/core/testing';

import { ProductDetailsService } from './product-details.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ProductDetailsService', () => {
  let service: ProductDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductDetailsService,RouterTestingModule.withRoutes([])],
    });
    service = TestBed.inject(ProductDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    const data = [
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
    ];
    service.getAllProducts().subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(data);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });
});
