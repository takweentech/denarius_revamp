import { CommonModule } from "@angular/common";
import { Component, TemplateRef, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  NgbModal,
  NgbCollapseModule,
  NgbOffcanvas,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, CommonModule, NgbCollapseModule, TranslatePipe],
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  private modalService = inject(NgbModal);
  private translateService = inject(TranslateService);
  private offcanvasService = inject(NgbOffcanvas);
  isCollapsed = false;
  resetPassword = false;
  navbarToggler: boolean = false;
  email: string = "support@denarius.com";
  lang: string = this.translateService.currentLang;
  constructor() {}

  ngOnInit(): void {}

  onLogin() {}

  onSignUp() {}

  openSidebar(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {
      position: "bottom",
      panelClass: "vh-70 rounded-top-1",
    });
  }

  onLangChange() {}
}
