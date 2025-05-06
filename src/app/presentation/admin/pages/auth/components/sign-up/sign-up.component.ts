import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { InvestorType } from '../../../../../../core/enums/investor.enums';


@Component({
  selector: 'app-sign-up',
  imports: [RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  WEB_ROUTES = WEB_ROUTES;
  InvestorType = InvestorType;
}
