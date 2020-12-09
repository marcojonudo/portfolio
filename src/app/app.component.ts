import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NotificationService} from './services/notification.service';
import {Subscription} from 'rxjs';
import {Section} from './objects/sections/section';
import {WelcomeSection} from './objects/sections/welcome-section';
import {Constants} from './objects/constants';
import {StyleIndex} from './objects/style-index';
import {User} from './objects/users/user';
import {DevUser} from './objects/users/dev-user';

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

    styles: StyleIndex[];

    constructor() {
        this.user = new DevUser();
        this.section = new WelcomeSection();
        this.styles = [];

        this.USER_STYLE_BUILDER = {};
        this.USER_STYLE_BUILDER[Constants.USER.NORMAL] = (section: Section) => section.buildTranslateProperty();
        this.USER_STYLE_BUILDER[Constants.USER.DEV] = (section: Section) => section.buildTranslateProperty();

        NotificationService.init();
    }

    ngOnInit(): void {
        this.styleIndexSubscription = NotificationService.styleIndex$.subscribe((styleIndex: StyleIndex) => {
            const existent = this.styles.findIndex(style => style.index === styleIndex.index);
            console.log(existent, styleIndex);
            if (existent === -1) {
                this.styles.push(styleIndex);
            }
            console.log('app styles', this.styles);
        });
    }

    setUser(user: User): void {
        this.user = user;
    }

    setSection(section: Section): void {
        this.section = section;
    }

    buildStyleObject(
        user: User = this.user, section: Section = this.section, styles: StyleIndex[] = this.styles
    ): { [key: string]: string } {
        return user.buildStyleObject(section, styles.map(s => s.style));
    }

}
