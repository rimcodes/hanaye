import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any[]): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
          return 'Just now';
      const intervals: { [key: string]: number } = {
          'سنة': 31536000,
          'شهر': 2592000,
          'اسبوع': 604800,
          'يوم': 86400,
          'ساعة': 3600,
          'دقيقة': 60,
          'ثانية': 1
      };
      let counter;
      for (const i in intervals) {
          counter = Math.floor(seconds / intervals[i]);
          if (counter > 0)
              if (counter === 1) {
                  // return counter + ' ' + i + ' منذ'; // singular (1 day ago)
                  return ' منذ ' + counter + ' '  + i
              } else {
                  // return counter + ' ' + i + ' منذ'; // plural (2 days ago)
                  return ' منذ ' + counter + ' '  + i
              }
      }
    }
    return value;
  }

}
