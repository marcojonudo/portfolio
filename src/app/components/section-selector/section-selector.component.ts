import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

    @Input() user: string;

    @Output() sectionEmitter: EventEmitter<Section>;

    section: Section;

    constructor() {
        this.section = new WelcomeSection();
        this.sectionEmitter = new EventEmitter<Section>();
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
