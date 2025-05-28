import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-branding',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './branding.component.html',
  styleUrl: './branding.component.scss'
})
export class BrandingComponent {
  version = environment.version;
}
