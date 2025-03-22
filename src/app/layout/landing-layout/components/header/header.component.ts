import { CommonModule } from "@angular/common";
import { Component, inject, TemplateRef, } from "@angular/core";
import { NgbCollapseModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, NgbCollapseModule,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  private offcanvasService = inject(NgbOffcanvas);
  navbarToggler: boolean = false;

  openSidebar(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'bottom', panelClass: 'vh-40 rounded-top-1' });
  }
}
