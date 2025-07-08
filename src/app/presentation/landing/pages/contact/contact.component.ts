import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { StrapiService } from '../../../../core/strapi/strapi.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  CMS_ASSETS_URL = environment.cmsAssetsUrl;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly translateService = inject(TranslateService);
  private readonly strapiService = inject(StrapiService);
  lang: string = this.translateService.currentLang;

  destroy$ = new Subject<void>();

  content = this.activatedRoute.snapshot.data['content'];

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    });
  }

  getContent(): void {
    this.strapiService
      .getContentByPage(
        `/contact?locale=${this.translateService.currentLang}` +
          `&populate=address` +
          `&populate=contact_details` +
          `&populate=contact_us` +
          `&populate=location`
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response;
        },
      });
  }
}
