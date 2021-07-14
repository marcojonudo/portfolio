import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef, OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren
} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {User} from '../../objects/users/user';
import {Section} from '../../objects/sections/section';
import {Style} from '../../objects/style';
import {NormalUser} from '../../objects/users/normal-user';
import {WelcomeSection} from '../../objects/sections/welcome-section';
import {AboutSection} from '../../objects/sections/about-section';
import {SkillsSection} from '../../objects/sections/skills-section';
import {BlogSection} from '../../objects/sections/blog-section';
import {Constants} from '../../objects/constants';
import {NotificationService} from '../../services/notification.service';
import {Utils} from '../../objects/utils';
import {TranslateInfoNavbarInfo} from '../../objects/navbar/translate-info-navbar-info';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('welcome', { read: ElementRef }) welcome: ElementRef;
	@ViewChild('scrollableContainer') scrollableContainer: ElementRef;
	@ViewChildren('sectionElem', { read: ElementRef }) sectionElements: QueryList<ElementRef>;

	private styleIndexSubscription: Subscription;
	private sectionSubscription: Subscription;

	private readonly USER_STYLE_BUILDER: any;

	screenHeight: number;
	sectionSelectorOffset: number;
	scrollTop: number;
	stickTopNav: boolean;
	sectionTops: number[];
	fontSize: number;

	user: User;
	sections: Section[];
	section: Section;

	styles: Style[];

	constructor(private cdRef: ChangeDetectorRef) {
		this.user = new NormalUser();
		this.sections = [new WelcomeSection(), new AboutSection(), new SkillsSection(), new BlogSection()];
		this.section = this.sections[0];
		this.styles = [];
		this.scrollTop = 0;
		this.sectionTops = [];

		this.USER_STYLE_BUILDER = {};
		this.USER_STYLE_BUILDER[Constants.USER.NORMAL] = (section: Section) => section.buildTranslateProperty();
		this.USER_STYLE_BUILDER[Constants.USER.DEV] = (section: Section) => section.buildTranslateProperty();

		this.fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	ngOnInit(): void {
		this.styleIndexSubscription = NotificationService.styles$.subscribe((styles: Style[]) => {
			this.styles = styles;
		});
		this.sectionSubscription = NotificationService.section$.subscribe((section: Section) => {
			this.setSection(section);
		});
	}

	ngOnDestroy(): void {
		this.styleIndexSubscription.unsubscribe();
		this.sectionSubscription.unsubscribe();
	}

	ngAfterViewInit(): void {
		this.screenHeight = window.innerHeight;
		console.log('screen height', this.screenHeight);

		const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		const margin = Constants.WELCOME_ITEM_MARGIN * fontSize;
		setTimeout(
			() => {
				const welcomeBottom = this.welcome.nativeElement.getBoundingClientRect().bottom;
				this.sectionSelectorOffset = welcomeBottom + margin;
				NotificationService.notifyNavbarInfo(
					new TranslateInfoNavbarInfo(this.section, this.stickTopNav, this.findNavTranslate())
				);

				this.sectionElements.toArray().forEach(section => {
					this.sectionTops.push(section.nativeElement.getBoundingClientRect().top);
				});
			},
			0
		);

		fromEvent(this.scrollableContainer.nativeElement, Constants.EVENT.SCROLL).subscribe((event: any) => {
			this.handleScroll(event);
		});
		this.cdRef.detectChanges();
	}

	findNavTranslate(
		stickTopNav: boolean = this.stickTopNav,
		sectionSelectorOffset: number = this.sectionSelectorOffset,
		scrollTop: number = this.scrollTop
	): number {
		return stickTopNav ? 0 : sectionSelectorOffset - scrollTop;
		// return `translateY(${offset}px)`;
	}

	setUser(user: User): void {
		this.user = user;
	}

	setSection(section: Section): void {
		this.section = section;
		this.scrollToSection(this.section);
	}

	scrollToSection(section: Section, sections: Section[] = this.sections, sectionTops: number[] = this.sectionTops): void {
		const sectionIndex = sections.findIndex(s => s.type === section.type);
		this.scrollableContainer.nativeElement.scrollTop =
			sectionTops[sectionIndex] - Utils.remToPx(Constants.NAV_HEIGHT_REM, this.fontSize);
	}

	buildStyleObject(
		user: User = this.user, section: Section = this.section, styles: Style[] = this.styles
	): { [key: string]: string } {
		return {}; // user.buildStyleObject(section, styles);
	}

	handleScroll(event: any, sectionSelectorOffset: number = this.sectionSelectorOffset): void {
		this.scrollTop = event.target.scrollTop;

		const navScrollTop = this.scrollTop + Utils.remToPx(Constants.NAV_HEIGHT_REM, this.fontSize);
		const topSections = this.sectionTops.filter(top => navScrollTop >= (top - this.screenHeight / 2));
		const sectionIndex = this.sectionTops.indexOf(topSections[topSections.length - 1]);
		this.section = this.sections[sectionIndex];

		this.stickTopNav = navScrollTop	 > sectionSelectorOffset;

		NotificationService.notifyNavbarInfo(
			new TranslateInfoNavbarInfo(this.section, this.stickTopNav, this.findNavTranslate())
		);
	}

}
