import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/services/translation.service';
import { environment } from '../environments/environment';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'denarius';
  private translationService = inject(TranslationService);
  constructor() {
    this.translationService.init(environment.defaultLang);
  }

  onLangChange(): void {
    this.translationService.onLangChange();
  }
}
