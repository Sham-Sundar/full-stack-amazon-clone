import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  getLocation(): Observable<any> {
    // Replace with your actual API endpoint
    const apiUrl = 'https://ipinfo.io/json?token=a87d15973396a7';
    return this.http.get(apiUrl);
  }
}
