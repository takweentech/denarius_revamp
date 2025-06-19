import { Component, OnInit, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";
import { TokenService } from "../../../../core/services/token.service";
import { TranslationService } from "../../../../core/services/translation.service";
import { TranslatePipe } from "@ngx-translate/core";
import { SidebarService } from "../sidebar/sidebar.service";
import { ConfigService } from "../../../../core/services/config.service";
import { environment } from "../../../../../environments/environment";
import { UserProfileData } from "../../../../core/models/user";
import { ProfileService } from "../../../../data/profile.service";
import { takeUntil } from "rxjs";
import { ToastService } from "../../../../shared/components/toast/toast.service";
import { BaseComponent } from "../../../../core/base/base.component";

@Component({
  selector: "app-header",
  imports: [NgbDropdownModule, TranslatePipe, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent extends BaseComponent implements OnInit {
  public WEB_ROUTES = WEB_ROUTES;
  private toastService = inject(ToastService);

  translationService = inject(TranslationService);
  private readonly tokenService = inject(TokenService);
  private readonly sidebarService = inject(SidebarService);
  private readonly router = inject(Router);
  private configService = inject(ConfigService);
  APP_CONFIG = this.configService.getConfig();
  cmsAssetsUrl = environment.cmsAssetsUrl;
  user: UserProfileData = this.tokenService.getUser();
  private readonly profileService = inject(ProfileService);
  imageUrl = signal<string>("https://i.ibb.co/MBtjqXQ/user.png"); // fallback avatar

  onToggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    // Get image
    this.profileService
      .getImageProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.imageUrl.set(response.data); // assuming the API returns a full URL
          }
        },
        error: () => {
          this.imageUrl.set("https://i.ibb.co/MBtjqXQ/user.png"); // fallback
        },
      });
  }

  onLogout() {
    this.tokenService.clearSession();
    this.router.navigate(["/" + WEB_ROUTES.AUTH.ROOT]);
  }

  onLangChange(): void {
    this.translationService.onLangChange();
  }
  ngAfterViewInit(): void {
    const el = document.getElementById("headerImage");
    if (el) {
      el.addEventListener("refresh", () => {
        this.profileService
          .getImageProfile()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              if (response.data) {
                this.imageUrl.set(response.data); // assuming the API returns a full URL
              }
            },
            error: () => {
              this.imageUrl.set("https://i.ibb.co/MBtjqXQ/user.png"); // fallback
            },
          });
      });
    }
  }
}
