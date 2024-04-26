import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AddToCartService } from '../../services/add-to-cart.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router, RouterLink } from '@angular/router';
import { CartProduct } from '../../services/add-to-cart.service';


@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule, InputNumberModule, RouterLink],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent{
  value1: number = 50;
  cartProducts!: CartProduct[];
  totalPrice!: number;
  totalQuantity!: number;

  constructor(public cartService: AddToCartService, private router: Router){}

  ngOnInit() {
    this.cartService.getCartItemsObservable().subscribe(
      (items) => {
        this.cartProducts = items;
        this.totalPrice = this.cartService.getTotal();
        this.totalQuantity = this.cartService.getTotalQuantity();
      }
    );

  }

  deleteCartItem(product: CartProduct){
    this.cartService.deleteFromCart(product);
  }

  checkout(){
    this.router.navigateByUrl('/checkout')
  }

}