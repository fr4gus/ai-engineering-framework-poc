import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';

import { AuthStateService } from '../../authentication/services/auth-state.service';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  return authState.currentUser$.pipe(
    filter(() => authState.isAuthStateResolved),
    take(1),
    map((currentUser) => (currentUser === null ? router.createUrlTree(['/login']) : true))
  );
};
