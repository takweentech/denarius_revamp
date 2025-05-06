import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-absher',
  imports: [],
  templateUrl: './absher.component.html',
  styleUrl: './absher.component.scss',
})
export class AbsherComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const inputs = Array.from(document.querySelectorAll('.otp-inputs input'));

    (inputs[inputs.length - 1] as HTMLElement).focus();

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        const currentInput = input as HTMLInputElement;

        if (currentInput.value.length === 1 && index > 0) {
          (inputs[index - 1] as HTMLElement).focus();
        }

        if (index === 0) {
          const code = inputs
            .map((i) => (i as HTMLInputElement).value)
            .reverse()
            .join('');
          console.log('OTP Code:', code);
        }
      });

      input.addEventListener('keydown', (e) => {
        const event = e as KeyboardEvent;
        const currentInput = input as HTMLInputElement;

        if (
          event.key === 'Backspace' &&
          currentInput.value === '' &&
          index < inputs.length - 1
        ) {
          (inputs[index + 1] as HTMLElement).focus();
        }
      });
    });
  }
}
