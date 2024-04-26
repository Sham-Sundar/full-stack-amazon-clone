import { CommonModule, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { SharedService } from '../../services/shared.service';
import { Router} from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { RatingService } from '../../services/rating.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule, SlicePipe, RatingModule, FormsModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {

  ratingValue!:number;
  product:Product[]= [];
  filteredProducts: Product[] = [];

  constructor(
    private productService:ProductsService,
    private sharedService: SharedService,
    private router:Router,
    private rating: RatingService){

    this.ratingValue = this.rating.value;

    //Receiving products from ProductsService
    this.productService.getProducts().subscribe((result)=>{
      this.product = result;
      this.filteredProducts = this.product;
    })

    //Receiving search bar input and applying filtering logic
    this.sharedService.searchData.subscribe(data => {      
      if(data){
        this.filteredProducts = this.product.filter(x=>x.title.toLowerCase().includes(data))
      }else{
        this.filteredProducts = this.product;
      }
    })
    
  }
  onClickProduct(id:number){
    this.router.navigateByUrl("product/"+id);
  }
}


