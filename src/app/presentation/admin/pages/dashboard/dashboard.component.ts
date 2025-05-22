import { Component, inject } from '@angular/core';
import { UserProfileData } from '../../../../core/models/user';
import { TokenService } from '../../../../core/services/token.service';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { TransactionChartComponent } from "./components/transaction-chart/transaction-chart.component";
import { PerformanceChartComponent } from "./components/performance-chart/performance-chart.component";
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-dashboard',
  imports: [InitialsPipe, TransactionChartComponent, PerformanceChartComponent, DatePipe, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly tokenService = inject(TokenService);

  user: UserProfileData = this.tokenService.getUser();

}
