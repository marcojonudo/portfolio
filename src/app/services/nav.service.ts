import {Injectable} from '@angular/core';
import {Section} from '../objects/sections/section';
import {User} from '../objects/users/user';
import {NormalUser} from '../objects/users/normal-user';
import {WelcomeSection} from '../objects/sections/welcome-section';
import {AboutSection} from '../objects/sections/about-section';
import {SkillsSection} from '../objects/sections/skills-section';
import {BlogSection} from '../objects/sections/blog-section';

@Injectable({
	providedIn: 'root'
})
export class NavService {

	user: User;
	sections: Section[];
	section: Section;
	scrolling: boolean;

	constructor() {
		this.user = new NormalUser();
		this.sections = [new WelcomeSection(), new AboutSection(), new SkillsSection(), new BlogSection()];
		this.section = this.sections[0];
	}

	setSection(index: number): Section {
		this.section = this.sections[index];
		return this.section;
	}

}
