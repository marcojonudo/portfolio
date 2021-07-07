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
import {BlogSection} from './objects/sections/blog-section';
import {AboutSection} from './objects/sections/about-section';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	title = 'portfolio';
}
