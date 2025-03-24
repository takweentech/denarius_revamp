import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-faq',
  imports: [NgbAccordionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  items = ['First', 'Second', 'Third'];
}
