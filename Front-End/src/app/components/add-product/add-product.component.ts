import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [MessageService]
})
export class AddProductComponent {

  constructor(private productService: ProductsService, private router: Router, private messageService: MessageService) { }

  product: Product = {
    image: '',
    title: '',
    brand: '',
    price: 0,
    discountedPrice: 0,
    category: '',
  }

  addProduct() {
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe({
      next: (result) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Added Successfully!' });
        setTimeout(() => {
          this.router.navigate(['/seller-central']);
        }, 1000);
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add product.'});
      }
    });
  }
 
}
