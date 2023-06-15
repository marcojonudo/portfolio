import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { Url } from '../utils/url';
import { Post } from '../objects/blog/post';
import { Title } from '@angular/platform-browser';
import { MetaProperties, MetaService } from './meta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '../utils/utils';
import { Comment } from '../objects/blog/comment';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	comments: Comment[];
	posts: Post[];
	post: WritableSignal<Post>;
	post$: Observable<Post>;
	isPost: WritableSignal<boolean>;
	commentsSubject: Subject<Comment>;
	comments$: Observable<Comment>;

	constructor(
		private http: HttpClient,
		private titleService: Title,
		private metaService: MetaService,
		private router: Router
	) {
		this.commentsSubject = new Subject<Comment>();
		this.comments$ = this.commentsSubject.asObservable();
		this.post = signal(undefined);
		this.isPost = signal(false);
	}

	notifyPost(activatedRoute: ActivatedRoute): void {
		activatedRoute.paramMap.pipe(
			concatMap(params => this.findPostObservable(params.get('id'))),
			tap((post: Post) => this.post.set(post))
		).subscribe();
	}

	findPostObservable(path: string): Observable<Post> {
		return this.findPost(path).pipe(
			tap((post: Post) => this.findUpdatePostMetaObservable(post).subscribe())
		);
	}

	findPostsObservable(): Observable<Post[]> {
		return (this.posts ? of(this.posts) : this.http.get(Url.posts())).pipe(
			map((posts: any[]) => posts.map(post => new Post(post))),
			map((posts: Post[]) => Utils.sortPosts(posts)),
			tap((posts: Post[]) => this.posts = posts),
			tap(() => this.findUpdateBlogMetaObservable(this.router))
		);
	}

	findUpdateBlogMetaObservable(router: Router): Observable<any> {
		return of(router.routerState.root).pipe(
			map((r: ActivatedRoute) => this.findRouteChild(r)),
			tap((r: ActivatedRoute) => this.titleService.setTitle(r.snapshot.data.title)),
			map((r: ActivatedRoute) => this.metaService.findBlogProperties(r.snapshot.data)),
			tap((d: MetaProperties) => this.metaService.addTags(d))
		);
	}

	findRouteChild(activatedRoute: ActivatedRoute): ActivatedRoute {
		return activatedRoute.firstChild ? this.findRouteChild(activatedRoute.firstChild) : activatedRoute;
	}

	findUpdatePostMetaObservable(post: Post): Observable<any> {
		return of(post).pipe(
			tap((p: Post) => this.titleService.setTitle(p.title)),
			map((p: Post) => this.metaService.findPostProperties(p)),
			tap((d: MetaProperties) => this.metaService.addTags(d))
		);
	}

	findPost(path: string): Observable<Post> {
		return this.http.get(Url.post(path)).pipe(
			map(post => new Post(post))
		);
	}

	findComments(postPath: string): Observable<any> {
		return this.http.get(Url.getComments(postPath)).pipe(
			tap(comments => {
				this.comments = comments.map(c => new Comment(c));
			})
		);
	}

	groupComments(comments: Comment[] = this.comments): Comment[] {
		const parents = comments.filter(c => !c.parent);
		const children = comments.filter(c => c.parent);
		this.fillReplies(parents, children);
		return parents;
	}

	fillReplies(parents: Comment[], children: Comment[]): void {
		const pending = [];
		children.forEach(c => {
			const parent = parents.find(p => p.equals(c.parent));
			if (parent) { parent.replies.push(c); } else { pending.push(c); }
		});
		if (pending.length) {
			const subParents = [].concat(...parents.map(c => c.replies)).filter(c => c);
			this.fillReplies(subParents, pending);
		}
	}

	uploadComment(comment: Comment, comments: Comment[] = this.comments): Observable<any> {
		comment.clearReplies();
		return this.http.post(Url.comments(), comment).pipe(
			map(c => {
				const savedComment = new Comment(c);
				if (comment.parent) {
					comment.parent.replies.push(savedComment);
				} else {
					comments.push(savedComment);
				}
				return savedComment;
			})
		);
	}

	// selectPost(post: Post): void {
	// 	this.post = post;
	// 	LocalStorageService.setItem('post', this.post);
	// 	this.postSubject.next(this.post);
	// }

}
