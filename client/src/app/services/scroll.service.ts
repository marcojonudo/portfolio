import { Injectable, signal, WritableSignal } from '@angular/core';
import { debounce, filter, map, tap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
import { ScrollData } from '../objects/scroll-data';
import { NavService } from './nav.service';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {

	scrollTop: WritableSignal<number>;
	lastScrollTop = 0;

	constructor(private navService: NavService) {
		this.scrollTop = signal(undefined);
	}

	buildScrollData$(scrollEvent: Observable<any>): Observable<ScrollData> {
		return scrollEvent.pipe(
			debounce(() => timer(5)),
			map((event: any) => event.target.scrollTop),
			map((scrollTop: number) => this.buildScrollData(scrollTop)),
			tap(scrollData => {
				this.lastScrollTop = scrollData.scrollTop;
				this.scrollTop.set(scrollData.scrollTop);
			}),
			filter((scrollData: ScrollData) => scrollData.scrollingDown === this.navService.showNavToggle || scrollData.top),
			tap((scrollData: ScrollData) => this.navService.setNavVariables(!this.navService.showNavToggle, scrollData.top))
		);
	}

	buildScrollData(scrollTop: number, lastScrollTop: number = this.lastScrollTop): ScrollData {
		return new ScrollData(scrollTop, scrollTop >= lastScrollTop);
	}

}
