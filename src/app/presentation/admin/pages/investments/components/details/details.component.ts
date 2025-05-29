import { Component, inject } from '@angular/core';
import { Investment } from '../../../../../../core/models/investment';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [NgbNavModule, TranslatePipe, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  active: number = 1;
  investment: Investment = this.activatedRoute.snapshot.data['investment'].data;

}
