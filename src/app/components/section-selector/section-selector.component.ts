import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Constants} from '../../objects/constants';
import {Section} from '../../objects/sections/section';
import {WelcomeSection} from '../../objects/sections/welcome-section';
import {AboutSection} from '../../objects/sections/about-section';
import {BlogSection} from '../../objects/sections/blog-section';
import {SkillsSection} from '../../objects/sections/skills-section';
import {NotificationService} from '../../services/notification.service';

@Component({
	selector: 'app-section-selector',
	templateUrl: './section-selector.component.html',
	styleUrls: ['./section-selector.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionSelectorComponent {

	private readonly BUTTON_WIDTH_REM: number = 6.5;

	@Input() user: string;
	@Input() stickTop: boolean;
	@Input() section: Section;

	@HostBinding('style.box-shadow') get navBoxShadow(): string {
		return this.stickTop ? '0 1px 2px #717171' : '';
	}

	navWidth: number;

	constructor() {
		const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		this.navWidth = this.BUTTON_WIDTH_REM * fontSize * Constants.SECTIONS;
	}

	// region Getters / setters

	get normalUser(): string {
		return Constants.USER.NORMAL;
	}

	get devUser(): string {
		return Constants.USER.DEV;
	}

	get welcomeSection(): Section {
		return new WelcomeSection();
	}

	get aboutSection(): Section {
		return new AboutSection();
	}

	get skillsSection(): Section {
		return new SkillsSection();
	}

	get blogSection(): Section {
		return new BlogSection();
	}

	// endregion

	checkSelectedUser(user: string, selectedUser: string = this.user): boolean {
		return user === selectedUser;
	}

	checkSelectedSection(section: Section, selectedSection: Section = this.section): boolean {
		return section.type === selectedSection.type;
	}

	selectSection(section: Section): void {
		this.section = section;
		NotificationService.notifySection(this.section);
	}

}
