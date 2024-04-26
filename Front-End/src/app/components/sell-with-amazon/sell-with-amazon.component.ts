import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sell-with-amazon',
  standalone: true,
  imports: [ButtonModule, RouterLink, CardModule],
  templateUrl: './sell-with-amazon.component.html',
  styleUrl: './sell-with-amazon.component.css'
})
export class SellWithAmazonComponent {

}
