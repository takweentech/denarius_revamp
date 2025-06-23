import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-wallet',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class WalletComponent {}
