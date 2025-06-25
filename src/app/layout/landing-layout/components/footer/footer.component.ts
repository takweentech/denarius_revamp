import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { environment } from '../../../../../environments/environment';
import { ConfigService } from '../../../../core/services/config.service';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  translationService = inject(TranslationService);
  private configService = inject(ConfigService);
  APP_CONFIG = this.configService.getConfig();
  cmsAssetsUrl = environment.cmsAssetsUrl;
  onLangChange(lang: string): void {
    this.translationService.onLangChange(lang);
  }
}
