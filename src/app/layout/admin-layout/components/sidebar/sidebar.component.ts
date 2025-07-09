import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { TranslatePipe } from '@ngx-translate/core';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly sidebarService = inject(SidebarService);
  sidebarItems = this.sidebarService.sidebarItems;
  public WEB_ROUTES = WEB_ROUTES;
}
