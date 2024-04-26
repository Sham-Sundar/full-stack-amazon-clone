import { Component, OnInit} from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { LocationService } from '../../services/location.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AddToCartService } from '../../services/add-to-cart.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, RouterOutlet, RouterLink, SidebarModule, ButtonModule, AvatarGroupModule, AvatarModule, ToastModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [MessageService]
})
export class HeaderComponent implements OnInit{
  sidebarVisible: boolean = false;
  userCity!: string;
  userCountry!: string;
  itemQuantity!: number;

  constructor(private location: LocationService,
    private messageService: MessageService,
    private cartService: AddToCartService
  ) { }

  ngOnInit() {
    // Subscribe to the cart items observable to get updates in real-time
    this.cartService.getCartItemsObservable().subscribe(
      (items) => {
        this.itemQuantity = this.cartService.getTotalQuantity();
      }
    );

    this.location.getLocation().subscribe({
      next: (data)=>{
        this.userCity = data.city;
        this.userCountry = data.country;
      },
      error: (err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to load location' });
      }
    })
  }

  
}
