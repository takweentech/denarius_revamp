import { Component, inject, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { environment } from '../../../../../../../environments/environment';
import AOS from 'aos';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-partners',
  imports: [TranslateModule],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
})
export class PartnersComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  partners!: any[];
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  content = this.activatedRoute.snapshot.data['content']['partners'];
  constructor() {
    super();
    AOS.init();
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    });
  }

  getContent(): void {
    this.strapiService
      .getContentByPage(`/homepage?locale=${this.translateService.currentLang}&populate=partners`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.partners;
        },
      });
  }
}
