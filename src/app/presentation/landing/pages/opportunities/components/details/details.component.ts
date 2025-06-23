import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Opportunity } from '../../../../../../core/models/opportunity';

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  opportunity: Opportunity = this.activatedRoute.snapshot.data['opportunity']?.data;
}
