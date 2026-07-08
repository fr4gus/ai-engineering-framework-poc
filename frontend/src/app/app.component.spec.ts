import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthenticatedUser } from './authentication/models/auth.models';
import { AuthStateService } from './authentication/services/auth-state.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('logs out from the authenticated navigation action', async () => {
    const authState = new MockAuthStateService();

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: AuthStateService, useValue: authState }, provideRouter([])]
    }).compileComponents();

    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();

    expect(authState.logoutCount).toBe(1);
  });
});

class MockAuthStateService {
  public readonly currentUser$ = new BehaviorSubject<AuthenticatedUser | null>({
    uid: 'user-1',
    email: 'player@example.com',
    displayName: 'player1'
  });

  public logoutCount = 0;

  public async logout(): Promise<void> {
    this.logoutCount += 1;
  }
}
