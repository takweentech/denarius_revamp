import { Component, inject, OnInit, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { WEB_ROUTES } from "../../../../../../core/constants/routes.constants";
import { DatePipe, DecimalPipe, NgClass } from "@angular/common";
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { finalize, takeUntil } from "rxjs";
import { GregorianDatepickerComponent } from "../../../../../../shared/components/gregorian-datepicker/gregorian-datepicker.component";
import { DividendService } from "../../../../../../data/dividend.service";
import {
  Dividend,
  DividendFilter,
} from "../../../../../../core/models/dividend";
import { LookupService } from "../../../../../../core/services/lookup.service";
import { LangPipe } from "../../../../../../shared/pipes/lang.pipe";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TranslationService } from "../../../../../../core/services/translation.service";
import { IslamicDatepickerComponent } from "../../../../../../shared/components/islamic-datepicker/islamic-datepicker.component";

@Component({
  selector: "app-listing",
  imports: [
    DecimalPipe,
    TranslatePipe,
    DatePipe,
    NgbPagination,
    GregorianDatepickerComponent,
    IslamicDatepickerComponent,
    NgClass,
    LangPipe,
    ReactiveFormsModule,
  ],
  templateUrl: "./listing.component.html",
  styleUrl: "./listing.component.scss",
})
export class ListingComponent extends BaseComponent implements OnInit {
  private readonly investorService = inject(DividendService);
  private readonly lookupService = inject(LookupService);
  private readonly fb = inject(FormBuilder);
  readonly translationService = inject(TranslationService);
  dateError = signal<boolean>(false);
  lang: string = this.translationService.language;
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
  WEB_ROUTES = WEB_ROUTES;
  earnings = signal<Dividend[]>([]);
  loading = signal<boolean>(false);
  total = signal<number>(0);
  statusList = this.lookupService.getDividendStatus();
  filterForm: FormGroup = this.fb.group({
    startDate: [null],
    endDate: [null],
  });

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

  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadDividends();
  }

  onFilterByStatus(status?: number, index?: number): void {
    this.statusList = this.statusList.map((item) => ({
      ...item,
      active: false,
    }));
    this.statusList[index as number].active = true;
    this.pagination.filter.statusId = status;
    this.loadDividends();
  }

  onFilterByDate(): void {
    const { startDate, endDate } = this.filterForm.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      this.dateError.set(true);
      return;
    }

    this.dateError.set(false);
    this.pagination.filter.startDate = this.filterForm.value.startDate;
    this.pagination.filter.endDate = this.filterForm.value.endDate;
    this.loadDividends();
  }
  onReset(): void {
    this.filterForm.reset();
    this.pagination.filter.startDate = undefined;
    this.pagination.filter.endDate = undefined;
    this.loadDividends();
  }
}
