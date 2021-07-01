import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit, QueryList,
	ViewChild,
	ViewChildren
} from '@angular/core';
import {NotificationService} from './services/notification.service';
import {fromEvent, Subscription} from 'rxjs';
import {Section} from './objects/sections/section';
import {Constants} from './objects/constants';
import {User} from './objects/users/user';
import {Style} from './objects/style';
import {NormalUser} from './objects/users/normal-user';
import {WelcomeSection} from './objects/sections/welcome-section';
import {SkillsSection} from './objects/sections/skills-section';
import {ProjectsSection} from './objects/sections/projects-section';
import {AboutSection} from './objects/sections/about-section';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
	title = 'portfolio';

	@ViewChild('welcome', { read: ElementRef }) welcome: ElementRef;
	@ViewChild('scrollableContainer') scrollableContainer: ElementRef;
	@ViewChildren('sectionElem', { read: ElementRef }) sectionElements: QueryList<ElementRef>;

	private styleIndexSubscription: Subscription;

	private readonly USER_STYLE_BUILDER: any;

	screenHeight: number;
	sectionSelectorOffset: number;
	scrollTop: number;
	stickTopNav: boolean;
	sectionTops: number[];

	user: User;
	sections: Section[];
	section: Section;

	styles: Style[];

	constructor(private cdRef: ChangeDetectorRef) {
		this.user = new NormalUser();
		this.sections = [new WelcomeSection(), new AboutSection(), new SkillsSection(), new ProjectsSection()];
		this.section = this.sections[0];
		this.styles = [];
		this.scrollTop = 0;
		this.sectionTops = [];

		this.USER_STYLE_BUILDER = {};
		this.USER_STYLE_BUILDER[Constants.USER.NORMAL] = (section: Section) => section.buildTranslateProperty();
		this.USER_STYLE_BUILDER[Constants.USER.DEV] = (section: Section) => section.buildTranslateProperty();

		NotificationService.init();
	}

	ngOnInit(): void {
		this.styleIndexSubscription = NotificationService.styles$.subscribe((styles: Style[]) => {
			this.styles = styles;
		});
	}

	ngAfterViewInit(): void {
		this.screenHeight = window.innerHeight;

		const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		const margin = Constants.WELCOME_ITEM_MARGIN * fontSize;
		setTimeout(
			() => {
				const welcomeBottom = this.welcome.nativeElement.getBoundingClientRect().bottom;
				this.sectionSelectorOffset = welcomeBottom + margin;
				this.cdRef.detectChanges();
			},
			0
		);

		this.sectionElements.toArray().forEach(section => {
			this.sectionTops.push(section.nativeElement.getBoundingClientRect().top);
		});
		fromEvent(this.scrollableContainer.nativeElement, 'scroll').subscribe((e: any) => {
			const topSections = this.sectionTops.filter(top => e.target.scrollTop >= top);
			const sectionIndex = this.sectionTops.indexOf(topSections[topSections.length - 1]);
			this.section = this.sections[sectionIndex];
		});
		this.cdRef.detectChanges();
	}

	findNavTranslate(
		stickTopNav: boolean = this.stickTopNav,
		sectionSelectorOffset: number = this.sectionSelectorOffset,
		scrollTop: number = this.scrollTop
	): string {
		const offset = stickTopNav ? 0 : sectionSelectorOffset - scrollTop;
		return `translateY(${offset}px)`;
	}

	setUser(user: User): void {
		this.user = user;
	}

	setSection(section: Section): void {
		this.section = section;
	}

	buildStyleObject(
		user: User = this.user, section: Section = this.section, styles: Style[] = this.styles
	): { [key: string]: string } {
		return {}; // user.buildStyleObject(section, styles);
	}

	handleScroll(event: any, sectionSelectorOffset: number = this.sectionSelectorOffset): void {
		this.scrollTop = event.target.scrollTop;
		this.stickTopNav = this.scrollTop > sectionSelectorOffset;
	}

}
