import { Component, ViewChild } from '@angular/core';

import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-transaction-chart',
  imports: [NgApexchartsModule],
  templateUrl: './transaction-chart.component.html',
  styleUrl: './transaction-chart.component.scss'
})
export class TransactionChartComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;
  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Transaction A", "Transaction B", "Transaction C", "Transaction D", "Transaction E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
    };
  }
}
