import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../objects/users/user';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

	@Input() user: User;

}
