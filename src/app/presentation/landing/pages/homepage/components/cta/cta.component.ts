import { CommonModule } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-cta",
  imports: [TranslateModule, CommonModule],
  templateUrl: "./cta.component.html",
  styleUrl: "./cta.component.scss",
})
export class CtaComponent {
  currentLang: string;
  isSmallScreen: boolean = window.innerWidth < 768;
  screenSize: string = "";

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || "ar";
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    this.updateScreenSize();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?: Event) {
    this.updateScreenSize();
  }

  updateScreenSize() {
    const width = window.innerWidth;
    if (width < 576) {
      this.screenSize = "xs";
    } else if (width >= 576 && width < 768) {
      this.screenSize = "sm";
    } else if (width >= 768 && width < 992) {
      this.screenSize = "md";
    } else if (width >= 992 && width < 1200) {
      this.screenSize = "lg";
    } else {
      this.screenSize = "xl";
    }
  }
}
