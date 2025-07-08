import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-services-header',
  imports: [],
  templateUrl: './services-header.component.html',
  styleUrl: './services-header.component.scss',
})
export class ServicesHeaderComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  content = this.activatedRoute.snapshot.data['content']['header'];
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
      .getContentByPage(`/service?locale=${this.translateService.currentLang}&populate=header`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.header;
        },
      });
  }
}
