import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavService} from '../../../services/nav.service';
import {Post} from '../../../objects/blog/post';
import {BlogService} from '../../../services/blog.service';
import {switchMap} from 'rxjs/operators';
import { FirestoreService } from '../../../services/firestore.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {

	posts: Observable<any[]>;
	filterText: string;

	constructor(
		private navService: NavService,
		private firestore: FirestoreService,
		private blogService: BlogService,
		private cdRef: ChangeDetectorRef
	) {
		this.posts = this.firestore.getPosts();
		console.log(1, this.posts);
		// this.blogService.getToc().pipe(
		// 	switchMap(posts => {
		// 		this.posts = posts;
		// 		return this.blogService.filterTextSubject.asObservable();
		// 	})
		// ).subscribe(filterText => {
		// 	this.filterText = filterText;
		// 	this.cdRef.detectChanges();
		// });
	}

}
