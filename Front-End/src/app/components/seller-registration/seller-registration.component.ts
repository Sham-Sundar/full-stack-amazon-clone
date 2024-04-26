import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { SellerAuthenticationService } from '../../services/seller-authentication.service';
import { SellerAuthentication } from '../../interfaces/seller-authentication.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-seller-registration',
  standalone: true,
  imports: [FormsModule, RouterLink, DividerModule, ReactiveFormsModule, ToastModule],
  templateUrl: './seller-registration.component.html',
  styleUrl: './seller-registration.component.css',
  providers: [MessageService]
})
export class SellerRegistrationComponent {

  constructor(
    private sellerAuth: SellerAuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) { }

  registerForm = this.fb.group({
    fullName: ['',
      [Validators.required,
      Validators.pattern(/^[A-Za-z]{2,30}(?: [A-Za-z]{2,30})?$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}/)]]
  });

  registerSeller() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.sellerAuth.registerSeller(postData as SellerAuthentication).subscribe({
      next: (result) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered Successfully!' });
        setTimeout(() => {
          this.router.navigate(['/seller-central/login']);
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in Registering' });
      }
    })
  }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

}
