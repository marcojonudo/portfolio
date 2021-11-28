import {
	ChangeDetectionStrategy, Component, HostBinding
} from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Section } from './objects/sections/section';
import { User } from './objects/users/user';
import { NormalUser } from './objects/users/normal-user';
import { WelcomeSection } from './objects/sections/welcome-section';
import { NavService } from './services/nav.service';
import { Device } from './objects/device/device';
import { Constants } from './utils/constants';
import { AestheticsService } from './services/aesthetics.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	title = 'portfolio';

	@HostBinding(`style.${Constants.PROPERTY.BACKGROUND_IMAGE}`) backgroundImage: string;
	@HostBinding(`style.${Constants.PROPERTY.COLOR}`) color: string;

	user: User;
	section: Section;
	device: Device;

	constructor(private navService: NavService, private aestheticsService: AestheticsService) {
		this.user = new NormalUser();
		this.section = new WelcomeSection();
		this.device = this.navService.device;
		NotificationService.init();

		this.navService.user$.subscribe(user => {
			this.user = user;
		});
		this.aestheticsService.palette$.subscribe(palette => {
			this.backgroundImage = palette.buildBackgroundImage();
			this.color = palette.color;
		});
	}

	get normalUser(): string {
		return Constants.USER.NORMAL;
	}

	checkUser(type: string, user: User = this.user): boolean {
		return type === user.type;
	}

}
