import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef, Inject, OnDestroy,
	OnInit, PLATFORM_ID,
	QueryList,
	ViewChild,
	ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../objects/users/user';
import { Section } from '../../../objects/sections/section';
import { Style } from '../../../objects/style';
import { NotificationService } from '../../../services/notification.service';
import { NavService } from '../../../services/nav.service';
import { Constants } from '../../../utils/constants';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Palette } from '../../../objects/palette/palette';
import { ScrollService } from '../../../services/scroll.service';
import { WindowService } from '../../../services/window/window.service';
import { ElementService } from '../../../services/element/element.service';
import { BlogService } from '../../../services/blog.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('welcome', { read: ElementRef }) welcome: ElementRef;
	@ViewChild('scrollableContainerElem') scrollableContainerElem: ElementRef;
	@ViewChildren('sectionElem', { read: ElementRef }) sectionElements: QueryList<ElementRef>;

	private styleIndexSubscription: Subscription;
	private sectionSubscription: Subscription;
	private paletteSubscription: Subscription;

	private readonly USER_STYLE_BUILDER: any;

	sectionSelectorOffset: number;
	scrollTop: number;

	screenHeight: number;

	palette: Palette;
	styles: Style[];

	constructor(
		private navService: NavService,
		private aestheticsService: AestheticsService,
		private scrollService: ScrollService,
		private windowService: WindowService,
		private elementService: ElementService,
		private blogService: BlogService,
		private cdRef: ChangeDetectorRef,
		@Inject(PLATFORM_ID) private platformId
	) {
		this.styles = [];
		this.scrollTop = 0;

		this.screenHeight = this.windowService.getHeight();

		this.USER_STYLE_BUILDER = {};
		this.USER_STYLE_BUILDER[Constants.USER.NORMAL] = (section: Section) => section.buildTranslateProperty();
		this.USER_STYLE_BUILDER[Constants.USER.DEV] = (section: Section) => section.buildTranslateProperty();
	}

	ngOnInit(): void {
		this.styleIndexSubscription = NotificationService.styles$.subscribe((styles: Style[]) => {
			this.styles = styles;
			this.cdRef.detectChanges();
		});
		this.paletteSubscription = this.aestheticsService.palette$.subscribe(palette => {
			this.palette = palette;
			this.cdRef.detectChanges();
		});
		this.sectionSubscription = this.navService.section$.subscribe((section: Section) => {
			this.scrollToSection(section);
		});
	}

	ngAfterViewInit(): void {
		this.scrollService.setScroll$(this.scrollableContainerElem);
		this.setSectionTops();
	}

	ngOnDestroy(): void {
		this.styleIndexSubscription.unsubscribe();
		this.sectionSubscription.unsubscribe();
		this.paletteSubscription.unsubscribe();
	}

	// region Getters / setters

	get user(): User {
		return this.navService.user;
	}

	get scrollableContainer(): string {
		return Constants.STYLED_DIV.SCROLLABLE_CONTAINER;
	}

	get sectionsContainer(): string {
		return Constants.STYLED_DIV.SECTIONS_CONTAINER;
	}

	// endregion

	scrollToSection(
		section: Section,
		sections: Section[] = this.navService.sections,
		sectionTops: number[] = this.navService.sectionTops
	): void {
		const sectionIndex = sections.findIndex(s => s.type === section.type);
		this.elementService.getNativeElement(this.scrollableContainerElem).scrollTop = sectionTops[sectionIndex];
	}

	buildStyleObject(
		div: string, user: User = this.navService.user, styles: Style[] = this.styles
	): { [key: string]: string } {
		return user.buildStyleObject(styles, div);
	}

	setSectionTops(): void {
		this.navService.sectionTops = this.sectionElements.toArray().map(elem =>
			this.elementService.getBoundingClientRect(elem).top
		);
	}

}
