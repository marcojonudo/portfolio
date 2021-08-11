import {Injectable} from '@angular/core';
import {Section} from '../objects/sections/section';
import {User} from '../objects/users/user';
import {NormalUser} from '../objects/users/normal-user';
import {WelcomeSection} from '../objects/sections/welcome-section';
import {AboutSection} from '../objects/sections/about-section';
import {SkillsSection} from '../objects/sections/skills-section';
import {BlogSection} from '../objects/sections/blog-section';
import {Subject} from 'rxjs';
import {Device} from '../objects/device/device';
import {Utils} from '../objects/utils';
import {Constants} from '../objects/constants';
import {SmallWidthDevice} from '../objects/device/small-width-device';
import {MediumWidthDevice} from '../objects/device/medium-width-device';

@Injectable({
	providedIn: 'root'
})
export class NavService {

	user: User;
	sections: Section[];
	section: Section;

	screenHeight: number;
	device: Device;
	translateY: Subject<string>;
	stickNav: boolean;
	transition: boolean;
	sectionTops: number[];

	fontSize: number;

	constructor() {
		this.screenHeight = window.innerHeight;

		this.user = new NormalUser();
		this.sections = [new WelcomeSection(), new AboutSection(), new SkillsSection(), new BlogSection()];
		this.section = this.sections[0];
		this.sectionTops = [];

		this.translateY = new Subject<string>();
		this.fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	findDevice(screenWidth: number, screenHeight: number, sectionSelectorOffset: number): Device {
		return screenWidth < 600 ? new SmallWidthDevice(screenHeight) : new MediumWidthDevice(sectionSelectorOffset);
	}

	setSection(index: number): Section {
		this.section = this.sections[index];
		return this.section;
	}

	setDevice(sectionSelectorOffset: number, screenHeight: number = this.screenHeight): void {
		this.device = this.findDevice(window.innerWidth, screenHeight, sectionSelectorOffset);
		this.setTranslateY(this.device.findTranslateY(0));
	}

	setTranslateY(translateY: string): void {
		this.translateY.next(translateY);
	}

	scroll(scrollTop: number): void {
		this.handleSectionScroll(scrollTop);

		this.transition = false;
		this.stickNav = this.device.checkStickNav(scrollTop);
		this.setTranslateY(this.device.findTranslateY(scrollTop));
	}

	handleSectionScroll(scrollTop: number, fontSize: number = this.fontSize): void {
		const navScrollTop = scrollTop + Utils.remToPx(Constants.NAV_HEIGHT_REM, fontSize);
		const topSections = this.sectionTops.filter(top => navScrollTop >= (top - this.screenHeight / 2));
		const sectionIndex = this.sectionTops.indexOf(topSections[topSections.length - 1]);
		this.setSection(sectionIndex);
	}

}
