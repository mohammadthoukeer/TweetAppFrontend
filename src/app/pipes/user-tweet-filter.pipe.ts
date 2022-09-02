import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userTweetFilter'
})
export class UserTweetFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any[] {

    if(!list) return [];
    if(!filterText) return list;

    filterText = filterText.toLowerCase();

    return list.filter( item => {
      if(item.username){
        return item.username.toLowerCase().includes(filterText);
      }
      return item.user.username.toLowerCase().includes(filterText);
    });

  }

}
