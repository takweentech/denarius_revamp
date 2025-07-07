import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-members',
  imports: [],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent extends BaseComponent implements OnInit {
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  content = this.activatedRoute.snapshot.data['content']['members'];
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    })
  };

  getContent(): void {
    this.strapiService.getContentByPage(`/about?locale=${this.translateService.currentLang}&populate[0]=members&populate[1]=members.members&populate[2]=members.members.image`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.content = response.members
      }
    })
  }
}
