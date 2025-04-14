import { Component, inject, signal } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { LicenceComponent } from "./components/licence/licence.component";
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';
import { FaqComponent } from "./components/faq/faq.component";
import { ComplianceComponent } from "./components/compliance/compliance.component";
import { CtaComponent } from "./components/cta/cta.component";
import { CtaBannerComponent } from "./components/cta-banner/cta-banner.component";
import { PartnersComponent } from "./components/partners/partners.component";
import { Router } from '@angular/router';
import { SplashScreenService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-homepage',
  imports: [HeroComponent, LicenceComponent, OpportunitiesComponent, FaqComponent, ComplianceComponent, CtaComponent, CtaBannerComponent, PartnersComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  private readonly router = inject(Router);
  private readonly splashScreen = inject(SplashScreenService);


}
