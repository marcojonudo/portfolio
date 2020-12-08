import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NotificationService} from './services/notification.service';
import {Subscription} from 'rxjs';
import {Section} from './objects/sections/section';
import {WelcomeSection} from './objects/sections/welcome-section';
import {Constants} from './objects/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    title = 'portfolio';

    private sectionSubscription: Subscription;

    user: string;
    section: Section;

    constructor() {
        this.user = Constants.USER.NORMAL;
        this.section = new WelcomeSection();
        NotificationService.init();
    }

    ngOnInit(): void {
        this.sectionSubscription = NotificationService.section$.subscribe((section: Section) => {
            this.section = section;
        });
    }

    setUser(user: string): void {
        this.user = user;
    }

    setSection(section: Section): void {
        this.section = section;
    }

}
