import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
@Component({
  selector: "app-faq",
  imports: [NgbAccordionModule, TranslateModule, CommonModule],
  templateUrl: "./faq.component.html",
  styleUrl: "./faq.component.scss",
})
export class FaqComponent {
  items = ["First", "Second", "Third"];
  faqItems = [
    {
      question: "HOMEPAGE.FAQ.QUESTIONS.Q1.QUESTION",
      answer: "HOMEPAGE.FAQ.QUESTIONS.Q1.ANSWER",
    },
    {
      question: "HOMEPAGE.FAQ.QUESTIONS.Q2.QUESTION",
      answer: "HOMEPAGE.FAQ.QUESTIONS.Q2.ANSWER",
    },
    {
      question: "HOMEPAGE.FAQ.QUESTIONS.Q3.QUESTION",
      answer: "HOMEPAGE.FAQ.QUESTIONS.Q3.ANSWER",
    },
    {
      question: "HOMEPAGE.FAQ.QUESTIONS.Q4.QUESTION",
      answer: "HOMEPAGE.FAQ.QUESTIONS.Q4.ANSWER",
    },
  ];
}
