import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly sidebarService = inject(SidebarService);
  sidebarItems = this.sidebarService.sidebarItems;

}
