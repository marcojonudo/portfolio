import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NotificationService} from './services/notification.service';
import {Subscription} from 'rxjs';
import {Section} from './objects/sections/section';
import {Constants} from './objects/constants';
import {User} from './objects/users/user';
import {Style} from './objects/style';
import {NormalUser} from './objects/users/normal-user';
import {WelcomeSection} from './objects/sections/welcome-section';
import {SkillsSection} from './objects/sections/skills-section';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    title = 'portfolio';

    private styleIndexSubscription: Subscription;

    private readonly USER_STYLE_BUILDER: any;

    user: User;
    section: Section;

    styles: Style[];

    constructor() {
        this.user = new NormalUser();
        this.section = new SkillsSection();
        // this.section = new WelcomeSection();
        this.styles = [];

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

    setUser(user: User): void {
        this.user = user;
    }

    setSection(section: Section): void {
        this.section = section;
    }

    buildStyleObject(
        user: User = this.user, section: Section = this.section, styles: Style[] = this.styles
    ): { [key: string]: string } {
        return user.buildStyleObject(section, styles);
    }

}
