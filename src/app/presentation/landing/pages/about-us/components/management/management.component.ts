import { Component, OnInit, inject } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-management',
  imports: [TranslateModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss',
})
export class ManagementComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  content = this.activatedRoute.snapshot.data['content']['management'];
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
    this.strapiService.getContentByPage(`/about?locale=${this.translateService.currentLang}&populate[0]=management&populate[1]=management.members&populate[2]=management.members.image&populate[3]=management.structure`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.content = response.management
      }
    })
  }
}
