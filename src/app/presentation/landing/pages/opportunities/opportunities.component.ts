import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [TranslateModule, RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class OpportunitiesComponent {}
