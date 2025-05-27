import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-profit-table",
  imports: [NgFor, NgIf, NgbPaginationModule, TranslatePipe],
  templateUrl: "./profit-table.component.html",
  styleUrl: "./profit-table.component.scss",
})
export class ProfitTableComponent {
  profits = [
    {
      status: "تم التوزيع",
      statusColor: "success",
      statusIcon: "fa-check-circle text-success me-1  ",
      contract: "مرابحة عقارية 001-2025",
      company: "الشركة",
      amount: "14,000",
      wallet: "محفظة xxxx22345",
      account: "حساب",
      date: "22/02/2025 11:44 AM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
    {
      status: "متأخر",
      statusColor: "late",
      statusIcon: "fa-exclamation-circle icon ",
      contract: "مرابحة سيارات 002-2025",
      company: "شركة التمويل",
      amount: "9,500",
      wallet: "محفظة xxxx11322",
      account: "حساب",
      date: "15/02/2025 10:00 AM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
    {
      status: "لم يحن بعد",
      statusColor: "secondary",
      statusIcon: "fa-clock text-white me-1 ",
      contract: "تمويل شخصي 003-2025",
      company: "شركة الاستثمار",
      amount: "7,200",
      wallet: "محفظة xxxx88211",
      account: "حساب",
      date: "28/02/2025 03:15 PM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
    {
      status: "تم التوزيع",
      statusColor: "success",
      statusIcon: "fa-check-circle text-success me-1  ",
      contract: "مرابحة معدات 004-2025",
      company: "الشركة",
      amount: "11,800",
      wallet: "محفظة xxxx09121",
      account: "حساب",
      date: "20/02/2025 08:20 AM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
    {
      status: "تم التوزيع",
      statusColor: "success",
      statusIcon: "fa-check-circle text-success me-1  ",
      contract: "مرابحة عقارية 005-2025",
      company: "الشركة العقارية",
      amount: "15,600",
      wallet: "محفظة xxxx74455",
      account: "حساب",
      date: "12/02/2025 12:00 PM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
    {
      status: "متأخر",
      statusColor: "late",
      statusIcon: "fa-exclamation-circle icon ",
      contract: "تمويل تجاري 006-2025",
      company: "شركة التجزئة",
      amount: "6,900",
      wallet: "محفظة xxxx30021",
      account: "حساب",
      date: "18/02/2025 04:45 PM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
    {
      status: "لم يحن بعد",
      statusColor: "secondary",
      statusIcon: "fa-clock text-white me-1 ",
      contract: "مرابحة سيارات 007-2025",
      company: "شركة المركبات",
      amount: "8,250",
      wallet: "محفظة xxxx12908",
      account: "حساب",
      date: "25/02/2025 02:30 PM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
    {
      status: "تم التوزيع",
      statusColor: "success",
      statusIcon: "fa-check-circle text-success me-1  ",
      contract: "تمويل تجاري 008-2025",
      company: "شركة التمويل",
      amount: "10,000",
      wallet: "محفظة xxxx90871",
      account: "حساب",
      date: "19/02/2025 09:00 AM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
    {
      status: "تم التوزيع",
      statusColor: "success",
      statusIcon: "fa-check-circle text-success me-1  ",
      contract: "مرابحة معدات 009-2025",
      company: "شركة المعدات",
      amount: "12,300",
      wallet: "محفظة xxxx48102",
      account: "حساب",
      date: "16/02/2025 01:20 PM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
    {
      status: "متأخر",
      statusColor: "late",
      statusIcon: "fa-exclamation-circle icon ",
      contract: "تمويل شخصي 010-2025",
      company: "الشركة",
      amount: "5,750",
      wallet: "محفظة xxxx33773",
      account: "حساب",
      date: "14/02/2025 11:10 AM",
      profitLabel: "الأرباح",
      dateLabel: "تاريخ التوزيع",
    },
  ];
  pagination = {
    pageNumber: 1,
    pageSize: 5,
  };

  goToPage(page: number) {
    this.pagination.pageNumber = page;
  }

  paginatedProfits() {
    const start = (this.pagination.pageNumber - 1) * this.pagination.pageSize;
    return this.profits.slice(start, start + this.pagination.pageSize);
  }

  loading() {
    return false;
  }
}
