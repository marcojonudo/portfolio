import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dayjs } from 'dayjs';
import { Router } from '@angular/router';
import { Post } from 'src/app/objects/blog/post';
import { Palette } from '../../../objects/palette/palette';
import { BlogService } from '../../../services/blog.service';
import { Constants } from '../../../utils/constants';

@Component({
	selector: 'app-post-card',
	templateUrl: './post-card.component.html',
	styleUrls: ['./post-card.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {

	@Input() post: Post;
	@Input() palette: Palette;

	constructor(private blogService: BlogService, private router: Router) {}

	getDay(date: Dayjs = this.post.date): Date {
		return date.toDate();
	}

	// buildPostUrl(post: Post = this.post): string {
	// 	console.log(`${Constants.DOMAIN}/blog/${post.path}`);
	// 	return `${Constants.DOMAIN}/blog/${post.path}`;
	// }

	selectPost(): void {
		// this.blogService.selectPost(this.post);
		this.router.navigate([Constants.URL.BLOG, this.post.path]);
	}

	// selectPost(): void {
	// 	this.router.navigate([Constants.URL.ROOT, this.post.path]);
	// }

}
