import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse, CurrentUserProfile } from './api.types';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  public getCurrentUserProfile(): Observable<ApiResponse<CurrentUserProfile>> {
    return this.http.get<ApiResponse<CurrentUserProfile>>(`${this.apiBaseUrl}/auth/me`);
  }
}
