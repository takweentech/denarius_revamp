import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

@Pipe({
  name: 'lang',
  pure: false,
})
export class LangPipe implements PipeTransform {
  private readonly translationService = inject(TranslationService);

  transform(value: any, ...args: unknown[]): string {
    if (!value) return '';
    return this.translationService.language === 'en' ? value.englishName : value.arabicName;
  }
}
