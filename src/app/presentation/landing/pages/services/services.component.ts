import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  imports: [
    TranslateModule,
    RouterOutlet,
  ],
  template: "<router-outlet></router-outlet>",
})
export class ServicesComponent {

}
