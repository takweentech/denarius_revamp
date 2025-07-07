import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-terms',
  imports: [],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
})
export class TermsComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  content = this.activatedRoute.snapshot.data['content']['terms_content'];

  constructor() {
    super();
  }

  ngOnInit(): void {
    const rawMarkdown = this.content?.terms_and_conditions_content || '';
    const html: string = marked.parse(rawMarkdown) as string;
    this.content.terms_and_conditions_content = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
