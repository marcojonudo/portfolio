import { ElementRef, Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { debounce, map } from 'rxjs/operators';
import { fromEvent, Observable, timer } from 'rxjs';
import { ScrollData } from '../objects/scroll-data';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {

	scrollTop$: Observable<ScrollData>;
	lastScrollTop = 0;

	setScroll$(scrollableContainerElem: ElementRef): void {
		this.scrollTop$ = fromEvent(scrollableContainerElem.nativeElement, Constants.EVENT.SCROLL).pipe(
			debounce(() => timer(5)),
			map((event: any) => event.target.scrollTop),
			map(scrollTop => {
				const scrollingDown = scrollTop >= this.lastScrollTop;
				this.lastScrollTop = scrollTop;
				return new ScrollData(scrollTop, scrollingDown);
			}),
		);
	}

}
