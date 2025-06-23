import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../../../../../core/base/base.component';
import { StrapiService } from '../../../../../../../../core/strapi/strapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services-header',
  imports: [],
  templateUrl: './services-header.component.html',
  styleUrl: './services-header.component.scss',
})
export class ServicesHeaderComponent extends BaseComponent implements OnInit {
  private readonly strapiService = inject(StrapiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['header'];
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
