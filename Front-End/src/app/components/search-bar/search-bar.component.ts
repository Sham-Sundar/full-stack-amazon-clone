import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(private sharedService: SharedService) { }

  // Sending search bar input to the sharedService
  onSearch(searchValue: string) {
    this.sharedService.sendData(searchValue);
  }
}
