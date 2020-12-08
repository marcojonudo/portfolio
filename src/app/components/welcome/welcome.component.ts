import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Constants} from '../../objects/constants';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {

    @Output() userEmitter: EventEmitter<string>;

    user: string;
    section: string;

    constructor() {
        this.user = Constants.USER.NORMAL;
        this.section = Constants.SECTION.WELCOME;

        this.userEmitter = new EventEmitter<string>();
    }

    // region Getters / setters

    get normalUser(): string {
        return Constants.USER.NORMAL;
    }

    get devUser(): string {
        return Constants.USER.DEV;
    }

    // endregion

    selectUser(user: string): void {
        this.user = user;
        this.userEmitter.emit(user);
    }

    checkSelectedUser(user: string, selectedUser: string = this.user): boolean {
        return user === selectedUser;
    }

}
