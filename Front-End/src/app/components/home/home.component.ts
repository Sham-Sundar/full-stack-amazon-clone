import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {

  product: Product[] = [];
  clothingShoesJewelryCategory: Product[] = [];
  groceryGourmetFoodCategory: Product[] = [];
  sportsOutdoorsCategory: Product[] = [];
  petSuppliesCategory: Product[] = [];
  toolsHomeImprovementCategory: Product[] = [];

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.clothingShoesJewelryCategory = data.filter(x => x.category?.toLowerCase().includes("clothing, shoes & jewelry"));
      this.groceryGourmetFoodCategory = data.filter(x => x.category?.toLowerCase().includes("grocery & gourmet food"));
      this.sportsOutdoorsCategory = data.filter(x => x.category?.toLowerCase().includes("sports & outdoors"));
      this.petSuppliesCategory = data.filter(x => x.category?.toLowerCase().includes("pet supplies"));
      this.toolsHomeImprovementCategory = data.filter(x => x.category?.toLowerCase().includes("tools & home improvement"));
    });
  }

  onClickProduct(id:number){
    this.router.navigateByUrl("product/"+id);
  }

}
