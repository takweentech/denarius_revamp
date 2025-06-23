import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-management',
  imports: [TranslateModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss',
})
export class ManagementComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data['content']['management'];
  CMS_ASSETS_URL = environment.cmsAssetsUrl;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
