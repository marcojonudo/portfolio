import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { BlogService } from '../../../services/blog.service';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../../../objects/users/user';
import { Section } from '../../../objects/sections/section';
import { WelcomeSection } from '../../../objects/sections/welcome-section';
import { AboutSection } from '../../../objects/sections/about-section';
import { SkillsSection } from '../../../objects/sections/skills-section';
import { BlogSection } from '../../../objects/sections/blog-section';
import { NotificationService } from '../../../services/notification.service';
import { Subscription } from 'rxjs';
import { Constants } from '../../../utils/constants';
import { Post } from '../../../objects/blog/post';
import { AestheticsService } from '../../../services/aesthetics.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Palette } from '../../../objects/palette/palette';

@Component({
	selector: 'app-normal-nav',
	templateUrl: './normal-nav.component.html',
	styleUrls: ['./normal-nav.component.sass'],
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
export class NormalNavComponent implements OnInit, OnDestroy {

	private readonly BUTTON_WIDTH_REM: number = 6.5;

	navWidth: number;
	translateY: string;

	url: string;
	blog: boolean;
	post: boolean;
	filterText: string;
	palette: Palette;

	private translateYSubscription: Subscription;

	constructor(
		public navService: NavService,
		private blogService: BlogService,
		private aestheticsService: AestheticsService,
		private router: Router,
		private cdRef: ChangeDetectorRef
	) {
		const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		this.navWidth = this.BUTTON_WIDTH_REM * fontSize * Constants.SECTIONS;

		this.aestheticsService.palette$.subscribe(palette => {
			this.palette = palette;
		});
	}

	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.url = event.urlAfterRedirects;
				this.navService.transition = true;
				if (this.url.includes(Constants.URL.BLOG)) {
					this.navService.stickNav = true;
					this.blog = true;
					this.post = this.url !== Constants.URL.BLOG;
					this.cdRef.detectChanges();
				} else {
					this.navService.stickNav = false;
					this.blog = false;
				}
			}
		});

		this.translateYSubscription = this.navService.translateY.asObservable().subscribe(translateY => {
			this.translateY = translateY;
			this.cdRef.detectChanges();
		});
	}

	ngOnDestroy(): void {
		this.translateYSubscription.unsubscribe();
	}

	// region Getters / setters

	get blogUrl(): string {
		return Constants.URL.BLOG;
	}

	get user(): User {
		return this.navService.user;
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

	get palettes(): Palette[] {
		return this.aestheticsService.palettes;
	}

	// endregion

	findNavTranslate(blog: boolean = this.blog, translateY: string = this.translateY): string {
		return `translateY(${blog ? 0 : translateY})`;
	}

	checkSelectedSection(section: Section, url: string = this.url, selectedSection: Section = this.navService.section): boolean {
		return url === Constants.URL.HOME && section.type === selectedSection.type;
	}

	selectSection(section: Section): void {
		this.navigateTo(Constants.URL.HOME);
		this.navService.section = section;
		NotificationService.notifySection(this.navService.section);
	}

	navigateTo(path: string): void {
		this.router.navigate([path]);
	}

	search(): void {
		this.blogService.search(this.filterText);
	}

	findSelectedPost(): Post {
		return this.blogService.post;
	}

	findTranslatePaletteValue(i: number): number {
		const findSelectedIndex = this.palettes.indexOf(this.aestheticsService.palette);
		return (i - findSelectedIndex) * 100;
	}

	togglePalette(): void {
		this.aestheticsService.togglePalette();
	}

}
