import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Constants} from '../../objects/constants';
import {Section} from '../../objects/sections/section';
import {WelcomeSection} from '../../objects/sections/welcome-section';
import {AboutSection} from '../../objects/sections/about-section';
import {ProjectsSection} from '../../objects/sections/projects-section';
import {SkillsSection} from '../../objects/sections/skills-section';

@Component({
	selector: 'app-section-selector',
	templateUrl: './section-selector.component.html',
	styleUrls: ['./section-selector.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionSelectorComponent {

	private readonly BUTTON_WIDTH_REM: number = 6.5;

	@Input() user: string;
	@Input() stickTopNav: boolean;
	@Input() section: Section;

	@Output() sectionEmitter: EventEmitter<Section>;

	@HostBinding('style.box-shadow') get navBoxShadow(): string {
		return this.stickTopNav ? '0 1px 2px #717171' : '';
	}

	navWidth: number;

	constructor() {
		this.sectionEmitter = new EventEmitter<Section>();

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

	get projectsSection(): Section {
		return new ProjectsSection();
	}

	get skillsSection(): Section {
		return new SkillsSection();
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
		this.sectionEmitter.emit(section);
	}

}
