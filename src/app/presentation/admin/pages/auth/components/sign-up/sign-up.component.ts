import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { InvestorType } from '../../../../../../core/enums/investor.enums';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  WEB_ROUTES = WEB_ROUTES;
  InvestorType = InvestorType;
  private readonly router = inject(Router);


  onRedirect(investorType: string): void {
    this.router.navigate(['/' + WEB_ROUTES.AUTH.ROOT + '/' + WEB_ROUTES.AUTH.REGISTRATION + '/' + investorType], { state: { redirectionUrl: history.state['redirectionUrl'] } })
  }

}
