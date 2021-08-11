import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit
} from '@angular/core';
import {Constants} from '../../objects/constants';
import {Section} from '../../objects/sections/section';
import {WelcomeSection} from '../../objects/sections/welcome-section';
import {AboutSection} from '../../objects/sections/about-section';
import {BlogSection} from '../../objects/sections/blog-section';
import {SkillsSection} from '../../objects/sections/skills-section';
import {NotificationService} from '../../services/notification.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NavService} from '../../services/nav.service';
import {User} from '../../objects/users/user';

@Component({
	selector: 'app-section-selector',
	templateUrl: './section-selector.component.html',
	styleUrls: ['./section-selector.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionSelectorComponent implements OnInit, OnDestroy {

	private readonly BUTTON_WIDTH_REM: number = 6.5;

	navWidth: number;
	translateY: string;

	url: string;
	blog: boolean;
	filterText: string;

	constructor(public navService: NavService, private router: Router, private cdRef: ChangeDetectorRef) {
		const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		this.navWidth = this.BUTTON_WIDTH_REM * fontSize * Constants.SECTIONS;

		this.navService.translateY.asObservable().subscribe(translateY => {
			this.translateY = translateY;
			this.cdRef.detectChanges();
		});
	}

	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.url = event.urlAfterRedirects;
				this.navService.transition = true;
				if (this.url === Constants.URL.BLOG) {
					this.navService.stickNav = true;
					this.blog = true;
					this.cdRef.detectChanges();
				} else {
					this.navService.stickNav = false;
					this.blog = false;
				}
			}
		});
	}

	ngOnDestroy(): void {
		this.navService.translateY.unsubscribe();
	}

	// region Getters / setters

	get blogUrl(): string {
		return Constants.URL.BLOG;
	}

	get user(): User {
		return this.navService.user;
	}

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

	findNavTranslate(blog: boolean = this.blog, translateY: string = this.translateY): string {
		return `translateY(${blog ? 0 : translateY})`;
	}

	checkSelectedUser(user: string, selectedUser: string = this.user.type): boolean {
		return user === selectedUser;
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

}
