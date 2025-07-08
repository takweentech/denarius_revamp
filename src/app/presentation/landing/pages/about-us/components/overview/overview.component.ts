import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  content = this.activatedRoute.snapshot.data['content']['overview'];
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
      .getContentByPage(`/about?locale=${this.translateService.currentLang}&populate=overview&populate=overview.box`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.overview;
        },
      });
  }
}
