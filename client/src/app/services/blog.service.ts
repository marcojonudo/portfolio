import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Url } from '../utils/url';
import { Post } from '../objects/blog/post';
import { toSignal } from '@angular/core/rxjs-interop';
import { Constants } from '../utils/constants';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	posts: Signal<Post[]>;

	constructor(private http: HttpClient) {
		this.posts = toSignal(this.findPosts());
	}

	findPosts(): Observable<Post[]> {
		return this.http.get(Url.posts()).pipe(
			map((posts: any[]) =>
				posts.map(post => new Post(post)).sort((a, b) => {
					if (a.date.isBefore(b.date)) { return 1; }
					if (a.date.isAfter(b.date)) { return -1; }
					return 0;
				})
			),
			tap(posts => {
				console.log('Posts', posts);
			})
		);
	}

	buildBlogUrl(domain = Constants.DOMAIN): string {
		return `${domain}/blog`;
	}

	buildPostUrl(post: Post): string {
		return `${this.buildBlogUrl()}/${post.path}`;
	}

}
