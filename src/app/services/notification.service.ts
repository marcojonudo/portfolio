import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Style} from '../objects/style';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	private static stylesSubject: Subject<Style[]>;
	private static _styles$: Observable<Style[]>;

	// region Getters / setters

	static get styles$(): Observable<Style[]> {
		return this._styles$;
	}

	static set styles$(value: Observable<Style[]>) {
		this._styles$ = value;
	}

	// endregion

	static init() {
		this.stylesSubject = new Subject<Style[]>();
		this.styles$ = this.stylesSubject.asObservable();
	}

	public static notifyStyles(styles: Style[]): void {
		this.stylesSubject.next(styles);
	}

}
