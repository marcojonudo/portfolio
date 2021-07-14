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
export class AppComponent implements OnInit, OnDestroy {
	title = 'portfolio';

	user: User;
	section: Section;
	stickTopNav: boolean;
	translateY: number;

	private navbarInfoSubscription: Subscription;

	constructor(private cdRef: ChangeDetectorRef) {
		this.user = new NormalUser();
		this.section = new WelcomeSection();
		NotificationService.init();
	}

	ngOnInit(): void {
		this.navbarInfoSubscription = NotificationService.navbarInfo$.subscribe(navbarInfo => {
			navbarInfo.execute(this);
			this.cdRef.detectChanges();
		});
	}

	ngOnDestroy(): void {
		this.navbarInfoSubscription.unsubscribe();
	}

	findNavTranslate(stickTopNav: boolean = this.stickTopNav, translateY: number = this.translateY): string {
		const offset = stickTopNav ? 0 : translateY;
		return `translateY(${offset}px)`;
	}

}
