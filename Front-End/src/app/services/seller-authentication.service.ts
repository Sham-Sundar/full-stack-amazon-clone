import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerAuthentication } from '../interfaces/seller-authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthenticationService {

  private sellerAuthUrl = 'http://localhost:3000/seller-authentication';

  constructor(private http: HttpClient) { }

  registerSeller(sellerDetails: SellerAuthentication){
    return this.http.post<SellerAuthentication>(this.sellerAuthUrl, sellerDetails);
  }

  getSellerByEmail(email: string){
    return this.http.get<SellerAuthentication[]>(`${this.sellerAuthUrl}?email=${email}`);
  }
}
