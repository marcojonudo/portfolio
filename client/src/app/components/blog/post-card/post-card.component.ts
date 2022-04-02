import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dayjs } from 'dayjs';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../objects/blog/post';
import { Router } from '@angular/router';

@Component({
	selector: 'app-post-card',
	templateUrl: './post-card.component.html',
	styleUrls: ['./post-card.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {

	@Input() post: Post;

	constructor(private blogService: BlogService, private router: Router) {}

	getDay(date: Dayjs = this.post.date): Date {
		return date.toDate();
	}

	selectPost(): void {
		this.blogService.selectPost(this.post);
		this.router.navigate(['/blog', this.blogService.parseTitle(this.post.title)]);
	}

}
