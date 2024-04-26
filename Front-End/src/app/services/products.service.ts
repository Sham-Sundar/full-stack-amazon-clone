import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(private http:HttpClient) {}

getProducts(){
  return this.http.get<Product[]>("http://localhost:3000/products");
}

getProductById(id:number){
  return this.http.get<Product>("http://localhost:3000/products/"+id);
}

addProduct(product:Product){
  return this.http.post<Product>("http://localhost:3000/products", product);
}

updateProduct(product:Product){
  return this.http.put<Product>("http://localhost:3000/products/"+product.id, product);
}

deleteProductById(id:number){
  return this.http.delete<Product>("http://localhost:3000/products/"+id);
}
}