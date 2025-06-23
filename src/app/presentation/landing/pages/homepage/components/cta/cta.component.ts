import { CommonModule } from '@angular/common';
import { Component, inject, HostListener, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../../core/base/base.component';
import AOS from 'aos';

@Component({
  selector: 'app-cta',
  imports: [TranslateModule, CommonModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss',
})
export class CtaComponent extends BaseComponent implements OnInit {
  imagePath!: string;
  CMS_ASSETS_URL = environment.cmsAssetsUrl;

  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['cta'];

  constructor(private translate: TranslateService) {
    super();
    AOS.init();
    this.currentLang = this.translate.currentLang || 'ar';
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void {
    const image = this.content?.image?.url;
    if (image) {
      this.imagePath = this.CMS_ASSETS_URL + image;
    }

    this.updateScreenSize();
  }

  currentLang: string;
  isSmallScreen: boolean = window.innerWidth < 768;
  screenSize: string = '';

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.updateScreenSize();
  }

  updateScreenSize() {
    const width = window.innerWidth;
    if (width < 576) {
      this.screenSize = 'xs';
    } else if (width >= 576 && width < 768) {
      this.screenSize = 'sm';
    } else if (width >= 768 && width < 992) {
      this.screenSize = 'md';
    } else if (width >= 992 && width < 1200) {
      this.screenSize = 'lg';
    } else {
      this.screenSize = 'xl';
    }
  }
}
