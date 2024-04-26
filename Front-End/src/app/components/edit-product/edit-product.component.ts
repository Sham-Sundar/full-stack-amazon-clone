import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  providers: [MessageService]
})

export class EditProductComponent {

  constructor(
    private productService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  product!: Product;

  ngOnInit() {
    const productId = this.route.snapshot.params['id']; // Get the id from the route
    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data; // Assign the fetched data to the product object
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch product.' });
      }
    });
  }

  editProduct() {
    this.productService.updateProduct(this.product).subscribe({
      next: (result) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Updated!' });
        setTimeout(() => {
          this.router.navigate(['/seller-central']);
        }, 1000);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Update Product.' });
      }
    });
  }

}
