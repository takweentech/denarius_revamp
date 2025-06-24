import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { StrapiService } from '../../../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent extends BaseComponent implements OnInit {
  private readonly strapiService = inject(StrapiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['intro'];
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
