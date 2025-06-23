import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../../../../core/models/transaction';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserProfileData } from '../../../../../../core/models/user';
import { TokenService } from '../../../../../../core/services/token.service';

@Component({
  selector: 'app-transaction-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './transaction-chart.component.html',
  styleUrl: './transaction-chart.component.scss',
})
export class TransactionChartComponent {
  private readonly tokenService = inject(TokenService);

  user: UserProfileData = this.tokenService.getUser();

  public pieChartLabels: string[] = Object.keys(this.user.financialDistribution).map(key => key.toUpperCase());
  public pieChartDatasets = [
    {
      data: Object.values(this.user.financialDistribution),
    },
  ];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  constructor() {}
}
