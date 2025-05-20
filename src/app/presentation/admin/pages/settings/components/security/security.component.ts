import { Component } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-security",
  imports: [TranslatePipe],
  templateUrl: "./security.component.html",
  styleUrl: "./security.component.scss",
})
export class SecurityComponent {}
