import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";
import { TokenService } from "../../../../core/services/token.service";
import { TranslationService } from "../../../../core/services/translation.service";
import { TranslatePipe } from "@ngx-translate/core";
import { SidebarService } from "../sidebar/sidebar.service";
import { ConfigService } from '../../../../core/services/config.service';
import { environment } from '../../../../../environments/environment';
import { UserProfileData } from '../../../../core/models/user';
@Component({
  selector: "app-header",
  imports: [NgbDropdownModule, TranslatePipe, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  public WEB_ROUTES = WEB_ROUTES;
  translationService = inject(TranslationService);
  private readonly tokenService = inject(TokenService);
  private readonly sidebarService = inject(SidebarService);
  private readonly router = inject(Router);
  private configService = inject(ConfigService);
  APP_CONFIG = this.configService.getConfig();
  cmsAssetsUrl = environment.cmsAssetsUrl;
  user: UserProfileData = this.tokenService.getUser();

  onToggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  onLogout() {
    this.tokenService.clearSession();
    this.router.navigate(["/" + WEB_ROUTES.AUTH.ROOT]);
  }

  onLangChange(): void {
    this.translationService.onLangChange();
  }
}
