import { Component, inject, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { StrapiService } from "../../../../../../core/strapi/strapi.service";
import { takeUntil } from "rxjs";
import { environment } from "../../../../../../../environments/environment";



@Component({
  selector: "app-partners",
  imports: [TranslateModule],
  templateUrl: "./partners.component.html",
  styleUrl: "./partners.component.scss",
})
export class PartnersComponent extends BaseComponent implements OnInit {
  partners!: any[];
  CMS_ASSETS_URL = environment.cmsAssetsUrl;

  private readonly strapiService = inject(StrapiService);

  ngOnInit(): void {
    this.strapiService.get('/partners?populate=*').pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.partners = response;
      }
    })
  }
}
