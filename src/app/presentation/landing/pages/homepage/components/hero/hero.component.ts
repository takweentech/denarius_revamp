import { Component, inject, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import AOS from 'aos';
import { NgStyle } from '@angular/common';
import { environment } from '../../../../../../../environments/environment';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-hero',
  imports: [TranslateModule, NgStyle, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent extends BaseComponent implements OnInit {
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  private readonly activatedRoute = inject(ActivatedRoute);
  WEB_ROUTES = WEB_ROUTES;
  imagePath!: string;
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  content = this.activatedRoute.snapshot.data['content']['hero'];
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
      .getContentByPage(`/homepage?locale=${this.translateService.currentLang}&populate=hero&populate=hero.media`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.hero;
        },
      });
  }
}
