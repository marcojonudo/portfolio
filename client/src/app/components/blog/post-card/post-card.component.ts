import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Dayjs} from 'dayjs';

@Component({
	selector: 'app-post-card',
	templateUrl: './post-card.component.html',
	styleUrls: ['./post-card.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {

	@Input() name: string;
	@Input() title: string;
	@Input() day: Dayjs;
	@Input() image: string;

	getDay(day: Dayjs = this.day): Date {
		return day.toDate();
	}

}
