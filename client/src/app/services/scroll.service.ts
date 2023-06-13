import { Injectable, signal, WritableSignal } from '@angular/core';
import { debounce, map } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
import { ScrollData } from '../objects/scroll-data';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {

	scrollTop: WritableSignal<number>;

	constructor() {
		this.scrollTop = signal(undefined);
	}

	buildScrollData$(scrollEvent: Observable<any>): Observable<ScrollData> {
		return scrollEvent.pipe(
			debounce(() => timer(5)),
			map((event: any) => event.target.scrollTop),
			map((scrollTop: number) => new ScrollData(scrollTop))
		);
	}

}
