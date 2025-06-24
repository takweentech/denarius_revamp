import { Component, inject } from '@angular/core';
import { UserProfileData } from '../../../../../../core/models/user';
import { TokenService } from '../../../../../../core/services/token.service';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'app-performance-chart',
  imports: [BaseChartDirective],
  templateUrl: './performance-chart.component.html',
  styleUrl: './performance-chart.component.scss',
})
export class PerformanceChartComponent {
  private readonly tokenService = inject(TokenService);
  user: UserProfileData = this.tokenService.getUser();
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: months,
    datasets: [{ data: this.orderDataBasedOnMonth() }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.8,
  };

  constructor() {}

  orderDataBasedOnMonth(): number[] {
    const data: number[] = [];

    months.forEach((month, index: number) => {
      const total = this.user.investmentPerformance.performanceData
        .filter(item => item.month - 1 === index)
        .map(item => item.value);

      data.push(Math.max(...total));
    });

    return data;
  }
}
