import { Component, inject, NgModule, OnInit, signal } from "@angular/core";
import { UserProfileData } from "../../../../../../core/models/user";
import { TokenService } from "../../../../../../core/services/token.service";
import { TranslatePipe } from "@ngx-translate/core";
import { WEB_ROUTES } from "../../../../../../core/constants/routes.constants";
import { DatePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { finalize, takeUntil } from "rxjs";
import { InvestorService } from "../../../../../../data/investor.service";
import { ProfileService } from "../../../../../../data/profile.service";
import { FormsModule, NgModel } from "@angular/forms";
import { WithdrawService } from "../../../../../../data/Withdrawal.service";
import { ToastService } from "../../../../../../shared/components/toast/toast.service";

@Component({
  selector: "app-listing",
  standalone: true,
  imports: [TranslatePipe, DatePipe, FormsModule, RouterLink, NgbPagination],
  templateUrl: "./listing.component.html",
  styleUrl: "./listing.component.scss",
})
export class ListingComponent extends BaseComponent implements OnInit {
  private readonly withdrawService = inject(WithdrawService);
  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);
  private toastService = inject(ToastService);

  user: UserProfileData = this.tokenService.getUser();
  withdrawAmount: number = 0;
  pagination: any = {
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
  investments = signal<any[]>([]);
  loading = signal<boolean>(false);
  total = signal<number>(0);

  loadOperations(): void {
    this.loading.set(true);
    this.profileService
      .getWalletInformation()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: () => {},
      });
  }

  ngOnInit(): void {
    this.loadOperations();
  }
  submitWithdrawal(): void {
    this.withdrawService.withdraw(this.withdrawAmount).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.toastService.show({
            text: response.message,
            classname: "bg-success text-light",
            icon: "fa-circle-check",
          });
        } else {
          this.toastService.show({
            text: response.message || "Withdrawal failed.",
            classname: "bg-danger text-light",
            icon: "fa-circle-exclamation",
          });
        }
      },
      error: (err) => {
        console.error("Withdrawal Failed:", err);
        this.toastService.show({
          text: "An error occurred. Please try again later.",
          classname: "bg-danger text-light",
          icon: "fa-circle-exclamation",
        });
      },
    });
  }
  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadOperations();
  }
}
