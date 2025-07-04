import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/services/translation.service';
import { environment } from '../environments/environment';
import { ToastComponent } from './shared/components/toast/toast.component';
import { TokenService } from './core/services/token.service';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from './data/profile.service';
import { BaseComponent } from './core/base/base.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'denarius';
  private translationService = inject(TranslationService);
  private profileService = inject(ProfileService);
  private tokenService = inject(TokenService);

  private $destroy = new Subject<void>();

  constructor() {
    super();
    this.translationService.init(environment.defaultLang);
  }

  ngOnInit(): void {
    if (this.tokenService.isAuthenticated()) {
      this.profileService
        .getUserProfile()
        .pipe(takeUntil(this.$destroy))
        .subscribe({
          next: response => {
            if (response?.data) {
              this.tokenService.setUser(response.data);
            } else {
              this.tokenService.clearSession();
            }
          },
          error: () => {
            this.tokenService.clearSession();
          },
        });
    }
  }

  onLangChange(): void {
    this.translationService.onLangChange();
  }
}
