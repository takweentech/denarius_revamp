import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['intro'];
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
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
      .getContentByPage(`/service?locale=${this.translateService.currentLang}&populate=intro&populate=intro.box`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.content = response.intro;
        },
      });
  }
}
