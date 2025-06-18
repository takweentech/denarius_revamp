import { Component } from "@angular/core";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe } from "@ngx-translate/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";
@Component({
  selector: "app-settings",
  imports: [
    TranslatePipe,
    NgbNavModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
  active: number = 1;
  WEB_ROUTES = WEB_ROUTES;

}
