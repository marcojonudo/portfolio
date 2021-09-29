import {
	ChangeDetectionStrategy,
	Component
} from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Section } from './objects/sections/section';
import { User } from './objects/users/user';
import { NormalUser } from './objects/users/normal-user';
import { WelcomeSection } from './objects/sections/welcome-section';
import { Constants } from './objects/constants';
import { NavService } from './services/nav.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Device } from './objects/device/device';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	title = 'portfolio';

	user: User;
	section: Section;
	device: Device;

	constructor(private navService: NavService) {
		this.user = new NormalUser();
		this.section = new WelcomeSection();
		this.device = this.navService.device;
		NotificationService.init();

		this.navService.user$.subscribe(user => {
			this.user = user;
		});
	}

	get normalUser(): string {
		return Constants.USER.NORMAL;
	}

	checkUser(type: string, user: User = this.user): boolean {
		return type === user.type;
	}

}
