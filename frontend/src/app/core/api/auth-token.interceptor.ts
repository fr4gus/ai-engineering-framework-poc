import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthStateService } from '../../authentication/services/auth-state.service';

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authState = inject(AuthStateService);

  if (!isProtectedApiRequest(request.url)) {
    return next(request);
  }

  return from(authState.getIdToken()).pipe(
    switchMap((token) => {
      if (token === null) {
        return next(request);
      }

      return next(
        request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      );
    })
  );
};

function isProtectedApiRequest(url: string): boolean {
  return url.startsWith(environment.apiBaseUrl) || url.includes('/api/v1/');
}
