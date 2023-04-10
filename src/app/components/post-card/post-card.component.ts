import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dayjs } from 'dayjs';
import { Router } from '@angular/router';
import { Post } from 'src/app/objects/blog/post';
import { Palette } from '../../objects/palette/palette';
import { BlogService } from '../../services/blog.service';

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

	selectPost(): void {
		this.blogService.selectPost(this.post);
		this.router.navigate(['/blog', this.post.path]);
	}

}
