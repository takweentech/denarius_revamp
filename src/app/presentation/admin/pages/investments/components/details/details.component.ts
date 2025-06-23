import { Component, inject, signal } from "@angular/core";
import { Investment } from "../../../../../../core/models/investment";
import { ActivatedRoute } from "@angular/router";
import { NgbNavModule, NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe } from "@ngx-translate/core";
import { DatePipe, DecimalPipe, NgClass } from "@angular/common";
import { Location } from "@angular/common";
import { DividendService } from "../../../../../../data/dividend.service";
import { TranslationService } from "../../../../../../core/services/translation.service";
import { Subject } from "rxjs"; // Added for destroy$
import { finalize, takeUntil } from "rxjs/operators"; // Added for RxJS operators
import { DividendFilter } from "../../../../../../core/models/dividend";

@Component({
  selector: "app-details",
  imports: [
    NgbNavModule,
    NgClass,
    DecimalPipe,
    NgbPagination,
    TranslatePipe,
    DatePipe,
  ],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent {
  private location = inject(Location);
  private readonly investorService = inject(DividendService);
  readonly translationService = inject(TranslationService);
  dateError = signal<boolean>(false);
  lang: string = this.translationService.language;
  private readonly activatedRoute = inject(ActivatedRoute);
  active: number = 1;
  investment: Investment = this.activatedRoute.snapshot.data["investment"].data;

  private destroy$ = new Subject<void>();
  loading = signal<boolean>(false);
  earnings = signal<any[]>([]);
  total = signal<number>(0);
  pagination: DividendFilter = {
    pageNumber: 1,
    pageSize: 5,
    filter: {},
    orderByValue: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
  };
  goBack(): void {
    (this.location as any).back();
  }
  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadDividends();
  }

  loadDividends(): void {
    this.loading.set(true);
    this.investorService
      .getPaged(this.pagination)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.earnings.set(response.data.data);
          this.total.set(response.data.totalCount);
        },
        error: () => {},
      });
  }

  ngOnInit(): void {
    this.loadDividends();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
