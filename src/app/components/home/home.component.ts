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
import {NavService} from '../../services/nav.service';

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

	styles: Style[];

	constructor(private navService: NavService, private cdRef: ChangeDetectorRef) {
		this.styles = [];
		this.scrollTop = 0;
		this.sectionTops = [];
		this.navService.scrolling = false;

		this.USER_STYLE_BUILDER = {};
		this.USER_STYLE_BUILDER[Constants.USER.NORMAL] = (section: Section) => section.buildTranslateProperty();
		this.USER_STYLE_BUILDER[Constants.USER.DEV] = (section: Section) => section.buildTranslateProperty();

		this.fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
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
				NotificationService.notifyNavbarInfo(new TranslateInfoNavbarInfo(this.findNavTranslate()));

				this.sectionElements.toArray().forEach(section => {
					this.sectionTops.push(section.nativeElement.getBoundingClientRect().top);
				});

				this.sectionSubscription = NotificationService.section$.subscribe((section: Section) => {
					this.scrollToSection(section);
				});
			},
			0
		);

		fromEvent(this.scrollableContainer.nativeElement, Constants.EVENT.SCROLL).subscribe((event: any) => {
			this.handleScroll(event);
		});
		this.cdRef.detectChanges();
	}

	ngOnDestroy(): void {
		this.styleIndexSubscription.unsubscribe();
		this.sectionSubscription.unsubscribe();
	}

	// region Getters / setters

	get user(): User {
		return this.navService.user;
	}

	// endregion

	findNavTranslate(sectionSelectorOffset: number = this.sectionSelectorOffset, scrollTop: number = this.scrollTop): number {
		let translateY = sectionSelectorOffset - scrollTop;
		translateY = translateY < 0 ? 0 : translateY;
		return translateY;
	}

	setUser(user: User): void {
		// this.user = user;
	}

	scrollToSection(section: Section, sections: Section[] = this.navService.sections, sectionTops: number[] = this.sectionTops): void {
		const sectionIndex = sections.findIndex(s => s.type === section.type);
		this.scrollableContainer.nativeElement.scrollTop =
			sectionTops[sectionIndex] - Utils.remToPx(Constants.NAV_HEIGHT_REM, this.fontSize);
		console.log(sectionIndex, sectionTops[sectionIndex] - Utils.remToPx(Constants.NAV_HEIGHT_REM, this.fontSize));
	}

	buildStyleObject(
		user: User = this.navService.user, section: Section = this.navService.section, styles: Style[] = this.styles
	): { [key: string]: string } {
		return {}; // user.buildStyleObject(section, styles);
	}

	handleScroll(event: any, sectionSelectorOffset: number = this.sectionSelectorOffset): void {
		this.navService.scrolling = true;
		this.scrollTop = event.target.scrollTop;

		const navScrollTop = this.scrollTop + Utils.remToPx(Constants.NAV_HEIGHT_REM, this.fontSize);
		const topSections = this.sectionTops.filter(top => navScrollTop >= (top - this.screenHeight / 2));
		const sectionIndex = this.sectionTops.indexOf(topSections[topSections.length - 1]);
		this.navService.setSection(sectionIndex);

		this.stickTopNav = this.scrollTop > sectionSelectorOffset;

		NotificationService.notifyNavbarInfo(new TranslateInfoNavbarInfo(this.findNavTranslate(), this.stickTopNav));
	}

}
