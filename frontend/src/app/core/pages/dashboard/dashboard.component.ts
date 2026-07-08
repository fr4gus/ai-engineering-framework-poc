import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { AuthStateService } from '../../../authentication/services/auth-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  protected readonly currentUser$ = inject(AuthStateService).currentUser$;
}
