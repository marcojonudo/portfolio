import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit
} from '@angular/core';
import {NotificationService} from './services/notification.service';
import {Subscription} from 'rxjs';
import {Section} from './objects/sections/section';
import {User} from './objects/users/user';
import {NormalUser} from './objects/users/normal-user';
import {WelcomeSection} from './objects/sections/welcome-section';

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

	constructor() {
		this.user = new NormalUser();
		this.section = new WelcomeSection();
		NotificationService.init();
	}

}
