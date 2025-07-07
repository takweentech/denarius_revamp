import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-values',
  imports: [],
  templateUrl: './values.component.html',
  styleUrl: './values.component.scss',
})
export class ValuesComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  content = this.activatedRoute.snapshot.data['content']['values'];
  CMS_ASSETS_URL = environment.cmsAssetsUrl;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    })
  };

  getContent(): void {
    this.strapiService.getContentByPage(`/about?locale=${this.translateService.currentLang}&populate=values&populate=values.values&populate=values.values.image`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.content = response.values
      }
    })
  }
}
