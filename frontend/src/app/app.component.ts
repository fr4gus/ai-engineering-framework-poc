import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AuthStateService } from './authentication/services/auth-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected readonly authState = inject(AuthStateService);

  protected async logout(): Promise<void> {
    await this.authState.logout();
  }
}
