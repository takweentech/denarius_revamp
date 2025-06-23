import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexLegend } from 'ng-apexcharts';
import { Transaction } from '../../../../../../core/models/transaction';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  responsive: ApexResponsive[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-transaction-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './transaction-chart.component.html',
  styleUrl: './transaction-chart.component.scss',
})
export class TransactionChartComponent implements OnChanges {
  @Input() transactions!: Transaction[];
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Transaction A', 'Transaction B', 'Transaction C', 'Transaction D', 'Transaction E'],
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2000,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              show: false, // ⬅ Make sure it's also false in responsive settings
            },
          },
        },
      ],
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.transactions?.length) {
      this.chartOptions.labels = [...this.transactions].map(transaction => transaction.transactionType);
      this.chartOptions.series = [...this.transactions].map(transaction => transaction.amount);
    }
  }
}
