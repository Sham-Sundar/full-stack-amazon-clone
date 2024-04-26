import { CommonModule, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingService } from '../../services/rating.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-seller-central',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule, ButtonModule, SlicePipe, RatingModule, FormsModule, ToastModule],
  templateUrl: './seller-central.component.html',
  styleUrl: './seller-central.component.css',
  providers: [MessageService]
})
export class SellerCentralComponent implements OnInit {
  ratingValue!: number;
  products!: Product[];

  constructor(private productService: ProductsService,
    private rating: RatingService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    })

    this.ratingValue = this.rating.value;
  }
  deleteProduct(id: number) {
    this.productService.deleteProductById(id).subscribe({
      next: (result) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Deleted!' });
        this.products = this.products.filter(product => product.id !== id);
        // setTimeout(() => {
        //   this.router.navigate(['/seller-central']);
        // }, 1000);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    });
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigateByUrl('/seller-central/login');
  }
}
