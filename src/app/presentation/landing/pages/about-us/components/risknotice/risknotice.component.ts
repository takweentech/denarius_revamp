import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-risknotice',
  imports: [],
  templateUrl: './risknotice.component.html',
  styleUrl: './risknotice.component.scss',
})
export class RisknoticeComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  content = this.activatedRoute.snapshot.data['content']['risk_notice'];

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
      .getContentByPage(`/about?locale=${this.translateService.currentLang}&populate=risk_notice`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.risk_notice;
        },
      });
  }
}
