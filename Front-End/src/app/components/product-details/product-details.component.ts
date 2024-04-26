import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../../services/rating.service';
import { AddToCartService } from '../../services/add-to-cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SlicePipe, CommonModule, DropdownModule, FormsModule, RatingModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent{

  ratingValue!: number;
  product!: Product;
  sizes: string[] | undefined;
  selectedSize!: string | undefined;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private rating: RatingService,
    private cartService: AddToCartService,
    private router: Router) { 

      this.ratingValue = this.rating.value;
    let productId = this.activatedRoute.snapshot.params["id"];

    // Receiving product from ProductsService by id
    this.productService.getProductById(productId).subscribe((result) => {
      this.product = result;
    })
    this.sizes = ["Small", "Medium", "Large", "X-Large", "XX-Large"];

    }


  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigateByUrl('/cart');
  }

}
