import { Injectable, signal } from '@angular/core';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarState = signal<boolean>(true);
  private items: SidebarItem[] = [
    {
      label: 'LAYOUT.SIDEBAR.DASHBOARD',
      icon: 'fa-solid fa-home',
      route: '/' + WEB_ROUTES.DASHBOARD.ROOT,
    },
    {
      label: 'LAYOUT.SIDEBAR.TRANSACTIONS',
      icon: 'fa-solid fa-list',
      route: '/' + WEB_ROUTES.TRANSACTIONS.ROOT,
    },
    {
      label: 'LAYOUT.SIDEBAR.INVESTMENTS',
      icon: 'fa-solid fa-line-chart',
      route: '/' + WEB_ROUTES.INVESTMENTS.ROOT,
    },
    {
      label: 'LAYOUT.SIDEBAR.EARNINGS',
      icon: 'fa-solid fa-dollar',
      route: '/' + WEB_ROUTES.EARNINGS.ROOT,
    },
    {
      label: 'LAYOUT.SIDEBAR.WALLET',
      icon: 'fa-solid fa-wallet',
      route: '/' + WEB_ROUTES.WALLET.ROOT,
    },
    {
      label: 'LAYOUT.SIDEBAR.SETTINGS',
      icon: 'fa-solid fa-cog',
      route: '/' + WEB_ROUTES.SETTINGS.ROOT,
    },
  ];
  get sidebarItems(): SidebarItem[] {
    return this.items;
  }

  get getSidebarState(): boolean {
    return this.sidebarState();
  }

  toggleSidebar(): void {
    this.sidebarState.set(!this.sidebarState());
  }

  set setSidebar(state: boolean) {
    this.sidebarState.set(state);
  }
}
