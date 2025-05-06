import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  private readonly router = inject(Router)
  WEB_ROUTES = WEB_ROUTES;


  onSignIn(): void {
    this.router.navigateByUrl('/' + WEB_ROUTES.DASHBOARD.ROOT)
  }

}
