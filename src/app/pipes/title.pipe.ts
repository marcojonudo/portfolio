import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'title'
})
export class TitlePipe implements PipeTransform {

	transform(posts: any[], titleFilter: string): any[] {
		return []; // titleFilter ? posts.filter(p => p.title.toLowerCase().includes(titleFilter.toLowerCase())) : posts;
	}

}
