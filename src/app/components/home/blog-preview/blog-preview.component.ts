import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Post} from '../../../objects/blog/post';
import {BlogService} from '../../../services/blog.service';

@Component({
	selector: 'app-blog-preview',
	templateUrl: './blog-preview.component.html',
	styleUrls: ['./blog-preview.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPreviewComponent {

	posts: Post[];

	constructor(private blogService: BlogService, private cdRef: ChangeDetectorRef) {
		this.blogService.getToc().subscribe(posts => {
			this.posts = posts.slice(0, 4);
			this.cdRef.detectChanges();
		});
	}

}
