import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/services/translation.service';
import { environment } from '../environments/environment';
import { StrapiService } from './core/strapi/strapi.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'denarius';
  private translationService = inject(TranslationService);
  private strapiService = inject(StrapiService);

  constructor() {
    this.translationService.init(environment.defaultLang);
  }

  onLangChange(): void {
    this.translationService.onLangChange();
  }
}
