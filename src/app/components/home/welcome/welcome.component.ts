import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../objects/users/user';
import {NormalUser} from '../../../objects/users/normal-user';
import {DevUser} from '../../../objects/users/dev-user';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {

	@Input() user: User;

	@Output() userEmitter: EventEmitter<User>;

	constructor() {
		this.userEmitter = new EventEmitter<User>();
	}

	// region Getters / setters

	get normalUser(): User {
		return new NormalUser();
	}

	get devUser(): User {
		return new DevUser();
	}

	// endregion

	selectUser(user: User): void {
		this.user = user;
		this.userEmitter.emit(user);
	}

	checkSelectedUser(user: string, selectedUser: string = this.user.type): boolean {
		return user === selectedUser;
	}

}
