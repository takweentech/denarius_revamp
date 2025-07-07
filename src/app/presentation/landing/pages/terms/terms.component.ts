import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { StrapiService } from '../../../../core/strapi/strapi.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-terms',
  imports: [],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
})
export class TermsComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly translateService = inject(TranslateService);
  private readonly strapiService = inject(StrapiService);

  override destroy$ = new Subject<void>();

  content = this.activatedRoute.snapshot.data['content']['terms_content'];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.parseMarkdown();

    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    });
  }

  parseMarkdown(): void {
    const rawMarkdown = this.content?.terms_and_conditions_content || '';
    const html: string = marked.parse(rawMarkdown) as string;
    this.content.terms_and_conditions_content = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getContent(): void {
    this.strapiService
      .getContentByPage(`/terms-and-condition?locale=${this.translateService.currentLang}&populate=terms_content`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.terms_content;
          this.parseMarkdown();
        },
      });
  }

  override ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
