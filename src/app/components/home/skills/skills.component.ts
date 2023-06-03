import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Palette } from '../../../objects/palette/palette';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {

	@Input() palette: Palette;

}
