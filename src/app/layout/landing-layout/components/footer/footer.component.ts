import { Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from "../../../../core/services/translation.service";

@Component({
  selector: "app-footer",
  imports: [TranslateModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {
  translationService = inject(TranslationService);
  onLangChange(lang: string): void {
    this.translationService.onLangChange(lang);
  }
}
