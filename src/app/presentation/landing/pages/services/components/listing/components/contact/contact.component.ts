import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['contact'];
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    })
  };

  getContent(): void {
    this.strapiService.getContentByPage(`/service?locale=${this.translateService.currentLang}&populate=contact`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.content = response.contact
      }
    })
  }
}
