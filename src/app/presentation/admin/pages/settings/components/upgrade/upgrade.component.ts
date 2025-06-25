import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UpgradeRequest, UpgradeRequestFilter } from '../../../../../../core/models/upgrade';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { UpgradeService } from '../../../../../../data/upgrade.service';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormComponent } from './form/form.component';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upgrade',
  imports: [TranslatePipe, DatePipe, NgbPaginationModule],
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.scss',
})
export class UpgradeComponent extends BaseComponent implements OnInit {
  private readonly upgradeService = inject(UpgradeService);
  private modalService = inject(NgbModal);
  WEB_ROUTES = WEB_ROUTES;
  requests = signal<UpgradeRequest[]>([]);
  loading = signal<boolean>(false);
  total = signal<number>(0);
  pagination: UpgradeRequestFilter = {
    pageNumber: 1,
    pageSize: 5,
    filter: {},
    orderByValue: [{}],
  };

  onCreateRequest() {
    const modalRef = this.modalService.open(FormComponent, { centered: true, size: 'lg' });

    modalRef.result.then(result => {
      if (result) this.loadRequests();
    });
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading.set(true);
    this.upgradeService
      .getPaged(this.pagination)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: response => {
          this.requests.set(response.data.data);
          this.total.set(response.data.totalCount);
        },
        error: () => {},
      });
  }

  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadRequests();
  }
}
