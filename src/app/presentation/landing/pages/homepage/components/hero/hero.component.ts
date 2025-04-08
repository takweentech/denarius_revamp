import { Component, inject, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import AOS from "aos";
import { StrapiService } from "../../../../../../core/strapi/strapi.service";
import { NgStyle } from "@angular/common";
import { environment } from "../../../../../../../environments/environment";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { takeUntil } from "rxjs";
@Component({
  selector: "app-hero",
  imports: [TranslateModule, NgStyle],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.scss",
})
export class HeroComponent extends BaseComponent implements OnInit {
  imagePath!: string;
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  private readonly strapiService = inject(StrapiService);
  constructor() {
    super();
    AOS.init();
  }


  ngOnInit(): void {
    this.strapiService.get('/hero?populate=*').pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.imagePath = response.image.url;
      }
    })
  }
}
