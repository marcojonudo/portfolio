import { Pipe, PipeTransform } from '@angular/core';
// import { Post } from '../objects/blog/post';

@Pipe({
	name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {

	transform(posts: any[]): any[] {
		return []; // posts; // posts.sort((a, b) => a.date.valueOf() - b.date.valueOf());
	}

}
