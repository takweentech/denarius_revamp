import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { TokenService } from '../../../../core/services/token.service';
import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  translationService = inject(TranslationService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  onLogout() {
    this.tokenService.clearSession();
    this.router.navigate(['/' + WEB_ROUTES.AUTH.ROOT])
  }
  onLangChange(): void {
    this.translationService.onLangChange();
  }
}
