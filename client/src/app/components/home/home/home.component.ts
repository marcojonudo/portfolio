import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component, effect,
	ElementRef, Injector,
	QueryList,
	ViewChild,
	ViewChildren
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { Section } from '../../../objects/sections/section';
import { Style } from '../../../objects/style';
import { NavService } from '../../../services/nav.service';
import { Constants } from '../../../utils/constants';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Palette } from '../../../objects/palette/palette';
import { ScrollService } from '../../../services/scroll.service';
import { WindowService } from '../../../services/window/window.service';
import { ElementService } from '../../../services/element/element.service';
import { BlogService } from '../../../services/blog.service';
import { filter, map, tap } from 'rxjs/operators';
import { ScrollData } from '../../../objects/scroll-data';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {

	@ViewChild('welcome', { read: ElementRef }) welcome: ElementRef;
	@ViewChild('scrollableContainerElem') scrollableContainerElem: ElementRef;
	@ViewChildren('sectionElem', { read: ElementRef }) sectionElements: QueryList<ElementRef>;

	private readonly USER_STYLE_BUILDER: any;

	scrollTop: number;

	screenHeight: number;

	palette: Palette;
	styles: Style[];

	lastScrollTop = 0;
	top: boolean;
	showNav: boolean;

	constructor(
		public navService: NavService,
		public aestheticsService: AestheticsService,
		private scrollService: ScrollService,
		private windowService: WindowService,
		private elementService: ElementService,
		private blogService: BlogService,
		private cdRef: ChangeDetectorRef,
		private injector: Injector
	) {
		this.styles = [];
		this.scrollTop = 0;

		this.screenHeight = this.windowService.getHeight();

		this.showNav = false;

		this.blogService.post.set(undefined);

		this.USER_STYLE_BUILDER = {};
		this.USER_STYLE_BUILDER[Constants.USER.NORMAL] = (section: Section) => section.buildTranslateProperty();
		this.USER_STYLE_BUILDER[Constants.USER.DEV] = (section: Section) => section.buildTranslateProperty();
	}

	ngAfterViewInit(): void {
		const scrollObservable = this.scrollService.buildScrollData$(
			fromEvent(this.scrollableContainerElem.nativeElement, Constants.EVENT.SCROLL)
		).pipe(
			map((scrollData: ScrollData) => this.buildScrollData(scrollData)),
			tap(scrollData => this.scrollService.scrollTop.set(scrollData.scrollTop)),
			filter((scrollData: ScrollData) => scrollData.scrollingDown === this.showNav || scrollData.scrollTop === 0),
			tap((scrollData: ScrollData) => this.notifyNavVariables(scrollData))
		);
		toSignal(scrollObservable, { injector: this.injector });

		this.setSectionTops();

		effect(() => this.scrollToSection(this.navService.section()), { injector: this.injector });
	}

	// region Getters / setters

	get scrollableContainer(): string {
		return Constants.STYLED_DIV.SCROLLABLE_CONTAINER;
	}

	get sectionsContainer(): string {
		return Constants.STYLED_DIV.SECTIONS_CONTAINER;
	}

	// endregion

	buildScrollData(scrollData: ScrollData): ScrollData {
		const scrollingDown = scrollData.scrollTop >= this.lastScrollTop;
		this.lastScrollTop = scrollData.scrollTop;
		return new ScrollData(scrollData.scrollTop, scrollingDown);
	}

	notifyNavVariables(scrollData: ScrollData): void {
		this.showNav = !this.showNav;
		this.navService.top.set(scrollData.scrollTop === 0);
		this.navService.showNav.set(this.showNav);
	}

	scrollToSection(
		section: Section,
		sections: Section[] = this.navService.sections,
		sectionTops: number[] = this.navService.sectionTops
	): void {
		const sectionIndex = sections.findIndex(s => s.type === section.type);
		this.elementService.getNativeElement(this.scrollableContainerElem).scrollTop = sectionTops[sectionIndex];
	}

	setSectionTops(): void {
		this.navService.sectionTops = this.sectionElements.toArray().map(elem =>
			this.elementService.getBoundingClientRect(elem).top
		);
	}

}
