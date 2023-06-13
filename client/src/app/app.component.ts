import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component, effect,
	HostBinding,
	Inject,
	OnDestroy,
	PLATFORM_ID
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
import { Palette } from './objects/palette/palette';
import { animate, style, transition, trigger } from '@angular/animations';
import { ScrollService } from './services/scroll.service';
import { Subscription } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollData } from './objects/scroll-data';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [trigger('leaveAnimation', [
		transition(
			':leave',
			[
				style({ opacity: 1 }),
				animate('.3s', style({ opacity: 0 }))
			]
		)
	])]
})
export class AppComponent {
	title = 'portfolio';

	@HostBinding(`style.${Constants.PROPERTY.BACKGROUND_IMAGE}`) backgroundImage: string;
	@HostBinding(`style.${Constants.PROPERTY.COLOR}`) color: string;

	section: Section;
	device: Device;
	showSplash: boolean;
	top: boolean;
	loaded: boolean;

	userSubscription: Subscription;
	paletteSubscription: Subscription;

	lastScrollTop = 0;

	constructor(
		public navService: NavService,
		public aestheticsService: AestheticsService,
		private scrollService: ScrollService,
		private cdRef: ChangeDetectorRef,
		private router: Router,
		@Inject(PLATFORM_ID) private platformId
	) {
		this.loaded = true;
		this.section = new WelcomeSection();
		this.device = this.navService.device;
		this.showSplash = true;
		NotificationService.init();

		effect(() => {
			const palette = this.aestheticsService.palette();
			this.backgroundImage = palette.buildBackgroundImage();
			this.color = palette.primaryColor;
		});
	}

	get normalUser(): string {
		return Constants.USER.NORMAL;
	}

	checkUser(type: string, user: User = this.navService.user()): boolean {
		return type === user.type;
	}

}
