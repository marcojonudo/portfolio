import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../objects/blog/post';
import { tap } from 'rxjs/operators';
import { Dayjs } from 'dayjs';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnDestroy{

	postSubscription: Subscription;
	post: Post;

	constructor(private blogService: BlogService) {
		this.postSubscription = this.findContent().subscribe(post => {
			this.post = post;
		});
	}

	ngOnDestroy(): void {
		this.postSubscription.unsubscribe();
	}

	findContent(): Observable<Post> {
		return this.blogService.post$.pipe(
			tap(post => console.log(post))
		);
	}

	getDay(date: Dayjs = this.post.date): Date {
		return date.toDate();
	}

}
