import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { StrapiService } from '../../../../../../../../core/strapi/strapi.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent extends BaseComponent implements OnInit {
  private readonly strapiService = inject(StrapiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['contact'];
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
