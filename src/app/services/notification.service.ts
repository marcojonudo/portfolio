import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Section} from '../objects/sections/section';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private static sectionSubject: Subject<Section>;
    private static _section$: Observable<Section>;

    // region Getters / setters

    static get section$(): Observable<Section> {
        return this._section$;
    }

    static set section$(value: Observable<Section>) {
        this._section$ = value;
    }

    // endregion

    static init() {
        this.sectionSubject = new Subject<Section>();
        this.section$ = this.sectionSubject.asObservable();

    }

    static notifySection(section: Section): void {
        this.sectionSubject.next(section);
    }

}
