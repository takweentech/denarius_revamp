import { Component } from '@angular/core';
import AOS from "aos";
@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  constructor() {
    AOS.init();
  }
}
