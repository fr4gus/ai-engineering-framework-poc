import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { authTokenInterceptor } from './app/core/api/auth-token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authTokenInterceptor]))
  ]
}).catch((error: unknown) => {
  console.error('Unable to bootstrap frontend', error);
});
