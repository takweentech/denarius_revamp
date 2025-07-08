import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-faq',
  imports: [NgbAccordionModule, TranslateModule, RouterLink, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent extends BaseComponent implements OnInit {
  WEB_ROUTES = WEB_ROUTES;
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['faq'];
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
      .getContentByPage(
        `/homepage?locale=${this.translateService.currentLang}&populate=faq&populate=faq.point&populate=faq.faqs`
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.faq;
        },
      });
  }
}
