import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../objects/blog/post';
import {Constants} from '../objects/constants';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	posts: Post[];

	constructor(private http: HttpClient) {
		this.http.get(Constants.TOC_PATH).subscribe((data: any[]) => {
			this.posts = data.map(post => new Post(post));
		});
	}

	getToc(): Observable<Post[]> {
		return this.http.get(Constants.TOC_PATH).pipe(
			map((posts: any[]) =>
				posts.map(post => new Post(post)).sort((a, b) => {
					if (a.day.isBefore(b.day)) {
						return 1;
					}
					if (a.day.isAfter(b.day)) {
						return -1;
					}
					return 0;
				})
			)
		);
	}

}
