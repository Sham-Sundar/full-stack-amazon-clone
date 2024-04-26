import { Routes } from '@angular/router';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SellerCentralComponent } from './components/seller-central/seller-central.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SellWithAmazonComponent } from './components/sell-with-amazon/sell-with-amazon.component';
import { SellerLoginComponent } from './components/seller-login/seller-login.component';
import { SellerRegistrationComponent } from './components/seller-registration/seller-registration.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
export const routes: Routes = [

    {path: "home", redirectTo: "", pathMatch: "full"},
    {path:"", component: HomeComponent,pathMatch: "full"},
    {path:"products", component: ProductCartComponent},
    {path:"product/:id", component: ProductDetailsComponent},
    {path:"sell-with-amazon", component: SellWithAmazonComponent},
    {path:"seller-central", component: SellerCentralComponent, canActivate: [authGuard]},
    {path:"seller-central/edit-product/:id", component: EditProductComponent},
    {path:"seller-central/add-product", component: AddProductComponent},
    {path:"seller-central/login", component: SellerLoginComponent, canActivate: [loginGuard]},
    {path:"seller-central/register", component: SellerRegistrationComponent},
    {path:"cart", component: AddToCartComponent},
    {path:"checkout", component: CheckoutComponent},
    {path:"signin", component: UserLoginComponent},
    {path:"register", component: UserRegistrationComponent},
    {path:"**", component: NotFoundComponent}
];
