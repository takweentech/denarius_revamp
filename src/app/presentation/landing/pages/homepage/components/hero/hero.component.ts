import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import AOS from "aos";
@Component({
  selector: "app-hero",
  imports: [TranslateModule],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.scss",
})
export class HeroComponent {
  constructor() {
    AOS.init();
  }
}
