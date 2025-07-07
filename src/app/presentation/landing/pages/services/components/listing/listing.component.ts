import { Component, OnInit, inject } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { IntroComponent } from './components/intro/intro.component';
import { ContactComponent } from './components/contact/contact.component';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import AOS from 'aos';
import { ServicesHeaderComponent } from './components/services-header/services-header.component';
import { takeUntil } from 'rxjs';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
@Component({
  selector: 'app-listing',
  imports: [TranslateModule, IntroComponent, ContactComponent, ServicesHeaderComponent, RouterLink],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
})
export class ListingComponent extends BaseComponent implements OnInit {
  imagePath!: string;
  WEB_ROUTES = WEB_ROUTES;
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly translateService = inject(TranslateService);
  content = this.activatedRoute.snapshot.data['content']['listing'];
  constructor() {
    super();
    AOS.init();
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    })
  };

  getContent(): void {
    this.strapiService.getContentByPage(`/service?locale=${this.translateService.currentLang}&populate=listing&populate=listing.service_singles&populate=listing.service_singles.image`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.content = response.listing
      }
    })
  }
}
