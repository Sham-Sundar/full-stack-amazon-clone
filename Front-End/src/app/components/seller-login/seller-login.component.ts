import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { SellerAuthenticationService } from '../../services/seller-authentication.service';
import { SellerAuthentication } from '../../interfaces/seller-authentication.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-seller-login',
  standalone: true,
  imports: [FormsModule, RouterLink, DividerModule, ReactiveFormsModule, ToastModule],
  templateUrl: './seller-login.component.html',
  styleUrl: './seller-login.component.css',
  providers: [MessageService]
})
export class SellerLoginComponent {
  
  constructor(
    private sellerAuth: SellerAuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  loginSeller() {
    const {email, password} = this.loginForm.value;
    this.sellerAuth.getSellerByEmail(email as string).subscribe({
      next: (res)=>{
        if (res.length > 0 && res[0].password === password) {
          sessionStorage.setItem('email', email as string);
          this.router.navigateByUrl('/seller-central');
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect email or password' });
        }
      },
      error: (err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    })
  }


  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }


}
