import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OverviewComponent } from './components/overview/overview.component';
import { ValuesComponent } from './components/values/values.component';
import { MembersComponent } from './components/members/members.component';
import { ManagementComponent } from './components/management/management.component';
import { RisknoticeComponent } from './components/risknotice/risknotice.component';
import { BaseComponent } from '../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { ComplianceComponent } from './components/compliance/compliance.component';

@Component({
  selector: 'app-about-us',
  imports: [
    TranslateModule,
    OverviewComponent,
    ValuesComponent,
    MembersComponent,
    ManagementComponent,
    RisknoticeComponent,
    ComplianceComponent,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['header'];
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
