import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../../core/base/base.component';
import AOS from 'aos';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-cta',
  imports: [TranslateModule, CommonModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss',
})
export class CtaComponent extends BaseComponent implements OnInit {
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  private readonly activatedRoute = inject(ActivatedRoute);
  imagePath!: string;
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  currentLang: string = this.translateService.currentLang;
  content = this.activatedRoute.snapshot.data['content']['cta'];

  constructor() {
    super();
    AOS.init();
  }

  ngOnInit(): void {
    const image = this.content?.image?.url;
    if (image) {
      this.imagePath = this.CMS_ASSETS_URL + image;
    }

    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    })
  }


  getContent(): void {
    this.strapiService.getContentByPage(`/homepage?locale=${this.translateService.currentLang}&populate=cta&populate=cta.box&populate=cta.image`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.content = response.cta
      }
    })
  }


}
