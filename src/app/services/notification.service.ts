import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {StyleIndex} from '../objects/style-index';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private static styleIndexSubject: Subject<StyleIndex>;
    private static _styleIndex$: Observable<StyleIndex>;

    // region Getters / setters

    static get styleIndex$(): Observable<StyleIndex> {
        return this._styleIndex$;
    }

    static set styleIndex$(value: Observable<StyleIndex>) {
        this._styleIndex$ = value;
    }

    // endregion

    static init() {
        this.styleIndexSubject = new Subject<StyleIndex>();
        this.styleIndex$ = this.styleIndexSubject.asObservable();
    }

    public static notifyStyleIndex(styleIndex: StyleIndex): void {
        this.styleIndexSubject.next(styleIndex);
    }

}
