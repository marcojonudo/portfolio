import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	effect,
	HostBinding,
	Inject,
	PLATFORM_ID,
	signal,
	WritableSignal
} from '@angular/core';
import { User } from './objects/users/user';
import { NavService } from './services/nav.service';
import { Constants } from './utils/constants';
import { AestheticsService } from './services/aesthetics.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ScrollService } from './services/scroll.service';
import { Coordinates } from './objects/coordinates';
import { isPlatformBrowser } from '@angular/common';

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

	SPLASH_DURATION = 1500;

	@HostBinding(`style.${Constants.PROPERTY.BACKGROUND_IMAGE}`) backgroundImage: string;
	@HostBinding(`style.${Constants.PROPERTY.COLOR}`) color: string;

	hideSplash: WritableSignal<boolean>;
	top: boolean;

	coordinates: Coordinates;

	constructor(
		public navService: NavService,
		public aestheticsService: AestheticsService,
		private scrollService: ScrollService,
		private cdRef: ChangeDetectorRef,
		@Inject(PLATFORM_ID) private platformId
	) {
		this.hideSplash = signal(false);

		effect(() => {
			const palette = this.aestheticsService.palette();
			this.backgroundImage = palette.buildBackgroundImage();
			this.color = palette.primaryColor;
		});
		if (isPlatformBrowser(platformId)) {
			setTimeout(() => this.hideSplash.set(true), this.SPLASH_DURATION);
		}
	}

	get normalUser(): string {
		return Constants.USER.NORMAL;
	}

	checkUser(type: string, user: User = this.navService.user()): boolean {
		return type === user.type;
	}

	setCoordinates(coordinates: Coordinates): void {
		this.coordinates = coordinates;
	}

}
