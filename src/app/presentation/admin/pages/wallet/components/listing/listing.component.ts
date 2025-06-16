import { Component, inject, OnInit, signal } from '@angular/core';
import { UserProfileData } from '../../../../../../core/models/user';
import { TokenService } from '../../../../../../core/services/token.service';
import { TranslatePipe } from '@ngx-translate/core';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';
import { InvestorService } from '../../../../../../data/investor.service';
import { ProfileService } from '../../../../../../data/profile.service';

@Component({
  selector: 'app-listing',
  imports: [TranslatePipe, DatePipe, RouterLink, NgbPagination],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent extends BaseComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);

  user: UserProfileData = this.tokenService.getUser();
  pagination: any = {
    pageNumber: 1,
    pageSize: 5,
    filter: {
    },
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
          console.log(response)
        },
        error: () => { },
      });
  }

  ngOnInit(): void {
    this.loadOperations();
  }

  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadOperations();
  }
}
