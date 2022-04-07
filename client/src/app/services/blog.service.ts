import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../objects/blog/post';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Url } from '../utils/url';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	posts: Post[];
	post: Post;
	postsSubject: BehaviorSubject<Post[]>;
	posts$: Observable<Post[]>;
	postSubject: BehaviorSubject<Post>;
	post$: Observable<Post>;
	filterTextSubject: BehaviorSubject<string>;
	filterText$: Observable<string>;

	constructor(private http: HttpClient) {
		const post = LocalStorageService.getItem('post');
		this.post = post ? new Post(post) : undefined;
		this.findPosts().subscribe((data: any[]) => {
			this.posts = data.map(p => new Post(p));
			this.postsSubject.next(this.posts);
		});
		this.postsSubject = new BehaviorSubject<Post[]>([]);
		this.posts$ = this.postsSubject.asObservable();
		this.postSubject = new BehaviorSubject<Post>(this.post);
		this.post$ = this.postSubject.asObservable();
		this.filterTextSubject = new BehaviorSubject<string>(undefined);
		this.filterText$ = this.filterTextSubject.asObservable();
	}

	findPosts(): Observable<Post[]> {
		return this.http.get(Url.posts()).pipe(
			map((posts: any[]) =>
				posts.map(post => new Post(post)).sort((a, b) => {
					if (a.date.isBefore(b.date)) {
						return 1;
					}
					if (a.date.isAfter(b.date)) {
						return -1;
					}
					return 0;
				})
			),
			tap(posts => {
				console.log('Posts', posts);
			})
		);
	}

	search(text: string): void {
		this.filterTextSubject.next(text);
	}

	selectPost(post: Post): void {
		this.post = post;
		LocalStorageService.setItem('post', this.post);
		this.postSubject.next(this.post);
	}

}
