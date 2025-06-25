import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IntroComponent } from './components/intro/intro.component';
import { ContactComponent } from './components/contact/contact.component';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';
import AOS from 'aos';
import { ServicesHeaderComponent } from './components/services-header/services-header.component';
@Component({
  selector: 'app-listing',
  imports: [TranslateModule, IntroComponent, ContactComponent, ServicesHeaderComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
})
export class ListingComponent extends BaseComponent implements OnInit {
  imagePath!: string;
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  private readonly strapiService = inject(StrapiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['listing'];
  constructor() {
    super();
    AOS.init();
  }

  ngOnInit(): void {}
}
