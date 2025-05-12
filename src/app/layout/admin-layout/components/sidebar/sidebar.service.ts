import { Injectable } from '@angular/core';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';

interface SidebarItem {
  label: string,
  icon: string,
  route: string,
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private items: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: 'fa-solid fa-home',
      route: '/' + WEB_ROUTES.DASHBOARD.ROOT,
    },
    {
      label: 'Financial transactions',
      icon: 'fa-solid fa-user',
      route: '/profile-management/transactions',
    },
    {
      label: 'Profile',
      icon: 'fa-solid fa-user',
      route: '/profile-management/profile',
    },
    {
      label: 'Investments',
      icon: 'fa-solid fa-user',
      route: '/profile-management/investments',
    },
    {
      label: 'Earnings',
      icon: 'fa-solid fa-user',
      route: '/profile-management/profit',
    },
    {
      label: 'Wallet',
      icon: 'fa-solid fa-user',
      route: '/profile-management/wallet',
    },
    {
      label: 'Settings',
      icon: 'fa-solid fa-user',
      route: '/profile-management/settings',
    },
  ]
  get sidebarItems(): SidebarItem[] {
    return this.items
  }
}
