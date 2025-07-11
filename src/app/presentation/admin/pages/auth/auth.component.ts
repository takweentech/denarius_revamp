import { Component, inject } from '@angular/core';
import { BrandingComponent } from './components/branding/branding.component';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  imports: [BrandingComponent, RouterOutlet, TranslatePipe],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  translationService = inject(TranslationService);
  onLangChange(): void {
    this.translationService.onLangChange();
  }
}
