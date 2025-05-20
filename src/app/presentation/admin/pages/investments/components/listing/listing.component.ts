import { Component, inject } from '@angular/core';
import { UserProfileData } from '../../../../../../core/models/user';
import { TokenService } from '../../../../../../core/services/token.service';
import { EarningsDistributionChartComponent } from "./components/earnings-distribution-chart/earnings-distribution-chart.component";
import { InvestmentsChartComponent } from "./components/investments-chart/investments-chart.component";

@Component({
  selector: 'app-listing',
  imports: [EarningsDistributionChartComponent, InvestmentsChartComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  private readonly tokenService = inject(TokenService);
  user: UserProfileData = this.tokenService.getUser();

}
