import { Injectable } from "@angular/core";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  private items: SidebarItem[] = [
    {
      label: "LAYOUT.SIDEBAR.DASHBOARD",
      icon: "fa-solid fa-home",
      route: "/" + WEB_ROUTES.DASHBOARD.ROOT,
    },
    {
      label: "LAYOUT.SIDEBAR.TRANSACTIONS",
      icon: "fa-solid fa-list",
      route: "/" + WEB_ROUTES.TRANSACTIONS.ROOT,
    },
    {
      label: "LAYOUT.SIDEBAR.INVESTMENTS",
      icon: "fa-solid fa-line-chart",
      route: "/profile-management/investments",
    },
    {
      label: "LAYOUT.SIDEBAR.EARNINGS",
      icon: "fa-solid fa-dollar",
      route: "/profile-management/profit",
    },
    {
      label: "LAYOUT.SIDEBAR.WALLET",
      icon: "fa-solid fa-wallet",
      route: "/profile-management/wallet",
    },
    {
      label: "LAYOUT.SIDEBAR.SETTINGS",
      icon: "fa-solid fa-cog",
      route: "/" + WEB_ROUTES.SETTINGS.ROOT,
    },
  ];
  get sidebarItems(): SidebarItem[] {
    return this.items;
  }
}
