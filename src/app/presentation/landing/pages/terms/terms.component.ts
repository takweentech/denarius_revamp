import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { StrapiService } from '../../../../core/strapi/strapi.service';
import { takeUntil } from 'rxjs/operators';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-terms',
  imports: [MarkdownComponent],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
})
export class TermsComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly translateService = inject(TranslateService);
  private readonly strapiService = inject(StrapiService);

  content = this.activatedRoute.snapshot.data['content']['terms_content'];

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
      .getContentByPage(`/terms-and-condition?locale=${this.translateService.currentLang}&populate=terms_content`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.terms_content;
        },
      });
  }
}
