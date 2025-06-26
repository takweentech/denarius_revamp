import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { environment } from '../../../../../../../environments/environment';
import AOS from 'aos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partners',
  imports: [TranslateModule],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
})
export class PartnersComponent extends BaseComponent implements OnInit {
  partners!: any[];
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['partners'];
  constructor() {
    super();
    AOS.init();
  }

  ngOnInit(): void {
    // this.strapiService.get('/partners?populate=*').pipe(
    //   takeUntil(this.destroy$)
    // ).subscribe({
    //   next: (response) => {
    //     this.partners = response;
    //   }
    // })
  }
}
