import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { Post } from '../../../objects/blog/post';
import { BlogService } from '../../../services/blog.service';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {

	posts: Post[];
	filterText: string;

	constructor(private navService: NavService, private blogService: BlogService, private cdRef: ChangeDetectorRef) {
		this.posts = [];
	}

	ngOnInit(): void {
		this.blogService.posts$.pipe(
			switchMap(posts => {
				this.posts = posts;
				return this.blogService.filterText$;
			})
		).subscribe(filterText => {
			this.filterText = filterText;
			this.cdRef.detectChanges();
		});
	}

}
