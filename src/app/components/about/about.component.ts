import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
