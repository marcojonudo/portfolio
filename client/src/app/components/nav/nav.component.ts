import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input
} from '@angular/core';
import { NavService } from '../../services/nav.service';
import { Router } from '@angular/router';
import { User } from '../../objects/users/user';
import { Section } from '../../objects/sections/section';
import { WelcomeSection } from '../../objects/sections/welcome-section';
import { AboutSection } from '../../objects/sections/about-section';
import { SkillsSection } from '../../objects/sections/skills-section';
import { BlogSection } from '../../objects/sections/blog-section';
import { Constants } from '../../utils/constants';
import { AestheticsService } from '../../services/aesthetics.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Palette } from '../../objects/palette/palette';
import { UntypedFormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('inOutAnimation', [
			transition(
				':enter',
				[
					style({ opacity: 0 }),
					animate('.2s', style({ opacity: 1 }))
				]
			),
			transition(
				':leave',
				[
					style({ opacity: 1 }),
					animate('.2s', style({ opacity: 0 }))
				]
			)
		])
	]
})
export class NavComponent {

	@Input() palette: Palette;

	@HostBinding('class.opened') opened: boolean;

	url: string;
	filterTextControl: UntypedFormControl;

	constructor(public navService: NavService, private aestheticsService: AestheticsService) {
		this.filterTextControl = new UntypedFormControl('');
		this.navService.searchInput$ = this.filterTextControl.valueChanges.pipe(
			startWith('') // TODO
		);
	}

	// region Getters / setters

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

	get palettes(): Palette[] {
		return this.aestheticsService.palettes;
	}

	// endregion

	checkSelectedSection(section: Section, url: string = this.url, selectedSection: Section = this.navService.section()): boolean {
		return url === Constants.URL.HOME && section.type === selectedSection.type;
	}

	selectSection(section: Section = this.welcomeSection): void {
		this.toggleOpened();
		this.navService.setSection(section);
	}

	findTranslatePaletteValue(i: number): number {
		const findSelectedIndex = this.palettes.indexOf(this.aestheticsService.palette());
		return (i - findSelectedIndex) * 100;
	}

	togglePalette(): void {
		this.aestheticsService.togglePalette();
	}

	toggleOpened(): void {
		this.opened = !this.opened;
	}

}
