import { Component, OnInit, inject } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { OverviewComponent } from './components/overview/overview.component';
import { ValuesComponent } from './components/values/values.component';
import { MembersComponent } from './components/members/members.component';
import { ManagementComponent } from './components/management/management.component';
import { RisknoticeComponent } from './components/risknotice/risknotice.component';
import { BaseComponent } from '../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { ComplianceComponent } from './components/compliance/compliance.component';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../core/strapi/strapi.service';

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
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  content = this.activatedRoute.snapshot.data['content']['header'];
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    });
  }

  getContent(): void {
    this.strapiService
      .getContentByPage(`/about?locale=${this.translateService.currentLang}&populate=header`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.header;
        },
      });
  }
}
