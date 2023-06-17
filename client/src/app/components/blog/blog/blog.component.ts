import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { Post } from '../../../objects/blog/post';
import { Palette } from '../../../objects/palette/palette';
import { BlogService } from '../../../services/blog.service';
import { AestheticsService } from '../../../services/aesthetics.service';
import { NavService } from '../../../services/nav.service';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('inOutAnimation', [
			transition(
				':enter',
				[
					style({ opacity: 0 }),
					animate('.1s', style({ opacity: 1 }))
				]
			),
			transition(
				':leave',
				[
					style({ opacity: 1 }),
					animate('.5s', style({ opacity: 0 }))
				]
			)
		])
	]
})
export class BlogComponent {

	posts$: Observable<Post[]>;
	palette: Palette;

	constructor(
		public blogService: BlogService,
		public aestheticsService: AestheticsService,
		private navService: NavService
	) {
		this.navService.showNav.set(true);
		this.blogService.post.set(undefined);

		this.posts$ = this.navService.searchInput$.pipe(
			switchMap(text => this.findPostsObservable(text))
		);
	}

	findPostsObservable(filterText: string): Observable<Post[]> {
		return this.blogService.findPostsObservable().pipe(
			map(posts => posts.filter(p => p.title.toLowerCase().includes(filterText.toLowerCase())))
		);
	}

}
