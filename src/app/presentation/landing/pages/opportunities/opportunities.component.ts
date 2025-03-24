import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-opportunities',
  imports: [HeroComponent, RouterOutlet],
  templateUrl: './opportunities.component.html',
  styleUrl: './opportunities.component.scss'
})
export class OpportunitiesComponent {

}
