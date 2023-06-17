import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Injector, ViewChild } from '@angular/core';
import { Dayjs } from 'dayjs';
import { ActivatedRoute } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Constants } from '../../../utils/constants';
import { BlogService } from '../../../services/blog.service';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Comment } from '../../../objects/blog/comment';
import { NavService } from '../../../services/nav.service';
import { tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ScrollService } from '../../../services/scroll.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('inOutAnimation', [
			transition(
				':enter',
				[
					style({ opacity: 0 }),
					animate('.1s', style({ opacity: 1 }))
				]
			),
			transition(
				':leave',
				[
					style({ opacity: 1 }),
					animate('.5s', style({ opacity: 0 }))
				]
			)
		])
	]
})
export class PostComponent {

	private readonly FIXED_IMAGE = 'fixed-image';

	@HostBinding(`style.${Constants.PROPERTY.BACKGROUND_IMAGE}`) backgroundImage: string;

	@ViewChild('scrollableContainerElem') scrollableContainerElem: ElementRef;

	parents: Comment[];

	constructor(
		public blogService: BlogService,
		public aestheticsService: AestheticsService,
		private navService: NavService,
		private scrollService: ScrollService,
		private activatedRoute: ActivatedRoute,
		private injector: Injector
	) {
		this.blogService.notifyPost(this.activatedRoute).pipe(
			tap(() => this.setScrollSignal())
		).subscribe();
	}

	setScrollSignal(): void {
		setTimeout(
			() => {
				const scrollObservable = this.scrollService.buildScrollData$(
					fromEvent(this.scrollableContainerElem.nativeElement, Constants.EVENT.SCROLL)
				);
				toSignal(scrollObservable, { injector: this.injector });
			},
			0
		);
	}

	findBackgroundImage(url: string): string {
		return `url('${url}')`;
	}

	buildGroupedComments(): Comment[] {
		return this.blogService.groupComments();
	}

	setImagesWidth(images: HTMLImageElement[]): void {
		images.forEach(image => {
			if (!image.className.includes(this.FIXED_IMAGE)) {
				const w = image.alt.split('.')[0].split('_').reverse()[0];
				const width = w && parseInt(w, 10) > 10 ? parseInt(w, 10) : 80;
				image.style.width = `${width}%`;
			}
		});
	}

	getDay(date: Dayjs): Date {
		return date.toDate();
	}

}
