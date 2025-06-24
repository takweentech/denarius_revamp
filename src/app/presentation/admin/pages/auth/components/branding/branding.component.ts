import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../../../../../core/services/config.service';

@Component({
  selector: 'app-branding',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './branding.component.html',
  styleUrl: './branding.component.scss',
})
export class BrandingComponent {
  version = environment.version;
  private configService = inject(ConfigService);
  APP_CONFIG = this.configService.getConfig();
  cmsAssetsUrl = environment.cmsAssetsUrl;
}
