import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

export interface CartProduct extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  private cartItemsSubject = new BehaviorSubject<CartProduct[]>(this.getCartItems());

  getCartItems(): CartProduct[] {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  getCartItemsObservable() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: Product) {
    const currentItems = this.getCartItems();
    const cartProduct: CartProduct = { ...product, quantity: 1 };
    currentItems.push(cartProduct);
    this.updateCartItems(currentItems);
  }

  deleteFromCart(product: CartProduct) {
    const currentItems = this.getCartItems().filter((item) => item.id !== product.id);
    this.updateCartItems(currentItems);
  }

  incrementQuantity(id: number) {
    const currentItems = this.getCartItems();
    const item = currentItems.find((i) => i.id === id);
    if (item) {
      item.quantity++;
      this.updateCartItems(currentItems);
    }
  }

  decrementQuantity(id: number) {
    const currentItems = this.getCartItems();
    const item = currentItems.find((i) => i.id === id);
    if (item && item.quantity > 0) {
      item.quantity--;
      this.updateCartItems(currentItems);
    }
  }

  getTotal() {
    const currentItems = this.getCartItems();
    return currentItems.reduce((acc, item)=>{
      // Calculate the total price
      return acc + item.discountedPrice * item.quantity;
    }, 0);
  }

  getTotalQuantity() {
    const currentItems = this.getCartItems();
    return currentItems.reduce((totalQuantity, item) => {
      return totalQuantity + item.quantity;
    }, 0);
  }

  private updateCartItems(items: CartProduct[]) {
    localStorage.setItem('cartItems', JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }
}
