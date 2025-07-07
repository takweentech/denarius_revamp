import { Component, OnInit, inject } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-compliance',
  imports: [TranslateModule],
  templateUrl: './compliance.component.html',
  styleUrl: './compliance.component.scss',
})
export class ComplianceComponent extends BaseComponent implements OnInit {
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['compliance'];
  constructor() {
    super();
  }


  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    })
  };

  getContent(): void {
    this.strapiService.getContentByPage(`/homepage?locale=${this.translateService.currentLang}&populate=compliance&populate=compliance.box`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.content = response.compliance
      }
    })
  }
}
