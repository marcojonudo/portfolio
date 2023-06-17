import { Injectable, signal, WritableSignal } from '@angular/core';
import { Section } from '../objects/sections/section';
import { User } from '../objects/users/user';
import { NormalUser } from '../objects/users/normal-user';
import { WelcomeSection } from '../objects/sections/welcome-section';
import { AboutSection } from '../objects/sections/about-section';
import { SkillsSection } from '../objects/sections/skills-section';
import { BlogSection } from '../objects/sections/blog-section';
import { Observable } from 'rxjs';
import { DevUser } from '../objects/users/dev-user';
import { Constants } from '../utils/constants';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class NavService {

	private readonly USER_BUILDER: { [key: string]: User } = {};

	user: WritableSignal<User>;

	sections: Section[];

	transition: boolean;
	sectionTops: number[];

	fontSize: number;

	section: WritableSignal<Section>;

	searchInput$: Observable<string>;

	showNavToggle: boolean;
	top: WritableSignal<boolean>;
	showNav: WritableSignal<boolean>;

	path: WritableSignal<string>;

	constructor(private router: Router) {
		this.USER_BUILDER[Constants.USER.NORMAL] = new NormalUser();
		this.USER_BUILDER[Constants.USER.DEV] = new DevUser();

		this.user = signal(this.USER_BUILDER[Constants.USER.NORMAL]);

		this.sections = [new WelcomeSection(), new AboutSection(), new SkillsSection(), new BlogSection()];
		this.section = signal(this.sections[0]);
		this.sectionTops = [];

		this.fontSize = Constants.DEFAULT_FONT_SIZE;

		this.showNavToggle = false;
		this.top = signal(false);
		this.showNav = signal(this.showNavToggle);

		this.path = signal('');

		this.router.events.pipe(
			filter(e => e instanceof NavigationEnd)
		).subscribe((e: NavigationEnd) =>
			this.path.set(e.url)
		);
	}

	buildUser(type: string, userBuilder: { [key: string]: User } = this.USER_BUILDER): User {
		return userBuilder[type];
	}

	setSection(section: Section): void {
		this.section.set(section);
	}

	setUser(user: User): void {
		this.user.set(user);
	}

	setNavVariables(showNav: boolean, scrollTop: boolean): void {
		this.showNavToggle = showNav;
		this.showNav.set(showNav);
		this.top.set(scrollTop);
	}

}
