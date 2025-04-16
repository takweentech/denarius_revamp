import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "../../../../../../core/base/base.component";

@Component({
  selector: "app-faq",
  imports: [NgbAccordionModule, TranslateModule, CommonModule],
  templateUrl: "./faq.component.html",
  styleUrl: "./faq.component.scss",
})
export class FaqComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data["content"]["faq"];
  constructor() {
    super();
  }

  ngOnInit(): void {}
  items = ["First", "Second", "Third"];
  faqItems = [
    {
      question: this.content.question[0].question,
      answer: this.content.question[0].answer,
    },
    {
      question: this.content.question[1].question,
      answer: this.content.question[1].answer,
    },
    {
      question: this.content.question[2].question,
      answer: this.content.question[2].answer,
    },
    {
      question: this.content.question[3].question,
      answer: this.content.question[3].answer,
    },
  ];
}
