import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { environment } from '../../../../../../../environments/environment';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';
import { BaseComponent } from '../../../../../../core/base/base.component';

@Component({
  selector: 'app-details',
  imports: [MarkdownComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent extends BaseComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  service = this.activatedRoute.snapshot.data['service'];

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    })
  };

  getContent(): void {
    this.strapiService.getContentByPage(`/service-singles/${this.activatedRoute.snapshot.params['id']}?locale=${this.translateService.currentLang}&populate=image`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.service = response.data
      }
    })
  }

}
