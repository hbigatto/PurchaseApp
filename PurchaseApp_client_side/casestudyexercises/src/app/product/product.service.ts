import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/generic-http.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '@app/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericHttpService<Product> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `products`);
  } // constructor
}
