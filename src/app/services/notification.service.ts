import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Style } from '../objects/style';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	private static stylesSubject: Subject<Style[]>;
	static styles$: Observable<Style[]>;

	// endregion

	static init() {
		this.stylesSubject = new Subject<Style[]>();
		this.styles$ = this.stylesSubject.asObservable();
	}

	public static notifyStyles(styles: Style[]): void {
		this.stylesSubject.next(styles);
	}

}
