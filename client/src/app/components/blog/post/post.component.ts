import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, OnDestroy {

	private postSubscription: Subscription;
	postPath: string;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.postSubscription = this.route.params.subscribe((params: { id: string }) => {
			this.postPath = `./assets/posts/${params.id}.md`;
		});
	}

	ngOnDestroy() {
		if (this.postSubscription) {
			this.postSubscription.unsubscribe();
		}
	}

}
