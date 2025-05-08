import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/services/translation.service';
import { environment } from '../environments/environment';
import { SplashScreenService } from './core/services/loading.service';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'denarius';
  private translationService = inject(TranslationService);
  private readonly splashScreen = inject(SplashScreenService);


  constructor() {
    this.translationService.init(environment.defaultLang);
  }

  onLangChange(): void {
    this.translationService.onLangChange();
  }
}
