import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IntroComponent } from "./components/intro/intro.component";
import { ContactComponent } from "./components/contact/contact.component";

@Component({
  selector: 'app-listing',
  imports: [TranslateModule, IntroComponent, ContactComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {

}
