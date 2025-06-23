import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDiff',
  standalone: true,
})
export class TimeDiffPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) return '';

    const expiryDate = +new Date(value);
    const now = +new Date();
    let seconds = (expiryDate - now) / 1000;
    const sign = Math.sign(seconds);
    let suffix = sign === -1 ? 'AGO' : 'LEFT';

    if (sign === -1) seconds = Math.floor(seconds * sign);

    const intervals: any = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    const allInterval = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

    for (let i of allInterval) {
      const main = Math.floor(seconds / intervals[i]);
      if (main > 0) {
        const remaining = seconds - main * intervals[i];
        const nextUnitIndex = allInterval.indexOf(i) + 1;

        // Only one unit
        if (nextUnitIndex > allInterval.length - 1) {
          return {
            key: 'TIME_DIFF.SINGLE',
            params: {
              count1: main,
              unit1: this.getUnitKey(i, main),
              suffix,
            },
          };
        }

        const nextUnit = allInterval[nextUnitIndex];
        const sub = Math.floor(remaining / intervals[nextUnit]);

        return {
          key: 'TIME_DIFF.DOUBLE',
          params: {
            count1: main,
            unit1: 'TIME_DIFF.' + this.getUnitKey(i, main), // TIME_DIFF.DAYS
            count2: sub,
            unit2: 'TIME_DIFF.' + this.getUnitKey(nextUnit, sub), // TIME_DIFF.WEEK
            suffix: 'TIME_DIFF.' + suffix, // TIME_DIFF.LEFT
          },
        };
      }
    }

    return { key: 'TIME_DIFF.NOW', params: {} };
  }

  getUnitKey(unit: string, count: number): string {
    const keys: any = {
      year: 'YEAR',
      month: 'MONTH',
      week: 'WEEK',
      day: 'DAY',
      hour: 'HOUR',
      minute: 'MINUTE',
      second: 'SECOND',
    };
    return count === 1 ? keys[unit] : keys[unit] + 'S';
  }
}
