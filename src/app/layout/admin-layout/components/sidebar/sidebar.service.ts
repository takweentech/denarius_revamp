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
      label: 'ملخص الحساب',
      icon: 'fa-solid fa-user',
      route: '/' + WEB_ROUTES.DASHBOARD.ROOT,
    },
    {
      label: 'المعاملات المالية',
      icon: 'fa-solid fa-user',
      route: '/profile-management/transactions',
    },
    {
      label: 'الملف الشخصي',
      icon: 'fa-solid fa-user',
      route: '/profile-management/profile',
    },
    {
      label: 'الاستثمارات',
      icon: 'fa-solid fa-user',
      route: '/profile-management/investments',
    },
    {
      label: 'جدول الأرباح',
      icon: 'fa-solid fa-user',
      route: '/profile-management/profit',
    },
    {
      label: 'المحفظة الاستثمارية',
      icon: 'fa-solid fa-user',
      route: '/profile-management/wallet',
    },
    {
      label: 'الإعدادات',
      icon: 'fa-solid fa-user',
      route: '/profile-management/settings',
    },
  ]
  get sidebarItems(): SidebarItem[] {
    return this.items
  }
}
