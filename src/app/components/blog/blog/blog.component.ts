import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavService} from '../../../services/nav.service';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../objects/blog/post';
import {BlogService} from '../../../services/blog.service';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {

	posts: Post[];

	constructor(private navService: NavService, private blogService: BlogService, private cdRef: ChangeDetectorRef) {
		this.navService.scrolling = false;

		this.blogService.getToc().subscribe(posts => {
			this.posts = posts;
			this.cdRef.detectChanges();
		});
	}

}
