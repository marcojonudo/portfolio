import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavService} from '../../services/nav.service';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {

	constructor(private navService: NavService) {
		this.navService.scrolling = false;
	}

}
