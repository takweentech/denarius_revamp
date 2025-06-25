import { Component, HostListener, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from './components/sidebar/sidebar.service';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminLayoutComponent {
  public readonly sidebarService = inject(SidebarService);

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    if (width > 768) {
      this.sidebarService.setSidebar = true;
    }
  }
}
