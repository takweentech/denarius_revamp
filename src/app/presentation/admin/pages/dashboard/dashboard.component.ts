import { Component, inject, OnInit } from '@angular/core';
import { UserProfileData } from '../../../../core/models/user';
import { TokenService } from '../../../../core/services/token.service';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';
import { PerformanceChartComponent } from './components/performance-chart/performance-chart.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    InitialsPipe,
    TransactionChartComponent,
    PerformanceChartComponent,
    DatePipe,
    TranslatePipe,
    RouterLink,
    DecimalPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent extends BaseComponent implements OnInit {
  readonly translationService = inject(TranslationService);
  lang: string = this.translationService.language;

  tokenService = inject(TokenService);
  WEB_ROUTES = WEB_ROUTES;
  user: UserProfileData = this.tokenService.getUser();
  ngOnInit(): void {}
}
