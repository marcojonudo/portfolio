import { Injectable } from '@angular/core';
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

	user: User;
	userSubject: Subject<User>;
	user$: Observable<User>;

	sections: Section[];
	section: Section;

	screenHeight: number;
	device: Device;
	stickNav: boolean;
	transition: boolean;
	sectionTops: number[];

	fontSize: number;

	coordinatesSubject: Subject<Coordinates>;
	coordinates$: Observable<Coordinates>;

	constructor() {
		this.USER_BUILDER[Constants.USER.NORMAL] = new NormalUser();
		this.USER_BUILDER[Constants.USER.DEV] = new DevUser();

		this.user = this.USER_BUILDER[Constants.USER.NORMAL];
		this.userSubject = new Subject<User>();
		this.user$ = this.userSubject.asObservable();

		this.sections = [new WelcomeSection(), new AboutSection(), new SkillsSection(), new BlogSection()];
		this.section = this.sections[0];
		this.sectionTops = [];

		this.fontSize = Constants.DEFAULT_FONT_SIZE;

		this.coordinatesSubject = new Subject<Coordinates>();
		this.coordinates$ = this.coordinatesSubject.asObservable();
	}

	buildUser(type: string, userBuilder: { [key: string]: User } = this.USER_BUILDER): User {
		return userBuilder[type];
	}

	setSection(index: number): Section {
		this.section = this.sections[index];
		return this.section;
	}

	setUser(user: User): void {
		this.user = user;
		this.user.init();
		this.userSubject.next(user);
	}

	move(coordinates: Coordinates): void {
		this.coordinatesSubject.next(coordinates);
	}

}
