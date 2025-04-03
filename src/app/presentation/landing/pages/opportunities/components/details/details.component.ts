import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: "app-details",
  imports: [RouterOutlet, TranslateModule],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent {}
