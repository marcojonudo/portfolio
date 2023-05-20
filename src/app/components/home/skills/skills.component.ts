import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Palette } from '../../../objects/palette/palette';
import { SkillService } from '../../../services/skill.service';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {

	@Input() palette: Palette;

	constructor(public skillService: SkillService) {}

}
