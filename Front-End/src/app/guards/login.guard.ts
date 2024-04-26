import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  
  if (sessionStorage.getItem('email')) {
    const router = inject(Router);
    return router.navigateByUrl('/seller-central');
  }else{
    return true;
  }
};
