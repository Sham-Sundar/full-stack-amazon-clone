import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private searchDataSubject = new BehaviorSubject<string>('');
  searchData = this.searchDataSubject.asObservable(); // Observable for subscribers

  sendData(data: string) {
    this.searchDataSubject.next(data); // For sending searched data
  }

  getData() {
    return this.searchDataSubject.value; // For receiving data
  }
}
