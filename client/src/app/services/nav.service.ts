import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Section } from '../objects/sections/section';
import { User } from '../objects/users/user';
import { NormalUser } from '../objects/users/normal-user';
import { WelcomeSection } from '../objects/sections/welcome-section';
import { AboutSection } from '../objects/sections/about-section';
import { SkillsSection } from '../objects/sections/skills-section';
import { BlogSection } from '../objects/sections/blog-section';
import { Observable, Subject } from 'rxjs';
import { Device } from '../objects/device/device';
import { DevUser } from '../objects/users/dev-user';
import { Coordinates } from '../objects/coordinates';
import { Constants } from '../utils/constants';

@Injectable({
	providedIn: 'root'
})
export class NavService {

	private readonly USER_BUILDER: { [key: string]: User } = {};

	user: WritableSignal<User>;

	sections: Section[];

	device: Device;
	transition: boolean;
	sectionTops: number[];

	fontSize: number;

	coordinatesSubject: Subject<Coordinates>;
	coordinates$: Observable<Coordinates>;

	section: WritableSignal<Section>;

	searchInput$: Observable<string>;

	top: WritableSignal<boolean>;
	showNav: WritableSignal<boolean>;

	constructor() {
		this.USER_BUILDER[Constants.USER.NORMAL] = new NormalUser();
		this.USER_BUILDER[Constants.USER.DEV] = new DevUser();

		this.user = signal(this.USER_BUILDER[Constants.USER.NORMAL]);

		this.sections = [new WelcomeSection(), new AboutSection(), new SkillsSection(), new BlogSection()];
		this.section = signal(this.sections[0]);
		this.sectionTops = [];

		this.fontSize = Constants.DEFAULT_FONT_SIZE;

		this.coordinatesSubject = new Subject<Coordinates>();
		this.coordinates$ = this.coordinatesSubject.asObservable();

		this.top = signal(false);
		this.showNav = signal(false);
	}

	buildUser(type: string, userBuilder: { [key: string]: User } = this.USER_BUILDER): User {
		return userBuilder[type];
	}

	setSection(section: Section): void {
		this.section.set(section);
		// this.section = section;
		// this.sectionSubject.next(section);
	}

	setUser(user: User): void {
		this.user.set(user);
		// this.user.init(); // TODO
		// this.userSubject.next(user);
	}

	move(coordinates: Coordinates): void {
		this.coordinatesSubject.next(coordinates);
	}

}
