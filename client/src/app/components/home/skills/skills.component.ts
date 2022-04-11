import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {Skill} from '../../../objects/skills/skill';
import { Palette } from '../../../objects/palette/palette';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {

	@Input() palette: Palette;

	skills: Skill[];

	constructor() {
		this.skills = [
			new Skill(
				'Groovy',
				'Deep knowledge and expertise with Groovy language. Loving the usability, but mistrusting all the dynamic possibilities',
				'groovy'
			),
			new Skill(
				'Java',
				'Groovy is the funniest member, but Java is the wisest one. I appreciate Groovy usability because I previously knew how Java worked!',
				'java'
			),
			new Skill(
				'Micronaut',
				'Diary use of Micronaut to create modular and efficient microservices',
				'micronaut'
			),
			new Skill(
				'Angular',
				'Have developed several demanding front apps. Change detection is your friend, earn its trust!',
				'angular'
			),
			new Skill(
				'Spock',
				'Testing in production, or with endless request/debug processes? I\'d rather not',
				'spock'
			),
			new Skill(
				'Docker',
				'An excellent project is not the only goal. We need a way to standardise it among the different environments',
				'docker'
			),
			new Skill(
				'CI/CD',
				'So many things to automate! What about automatic versioning, test execution or docker image creation?',
				'ci-cd'
			),
			new Skill(
				'OpenAPI',
				'Technical documentation may be quite more interesting than a verbose one; however, I also love writing, just in case',
				'swagger'
			),
			new Skill(
				'Git',
				'How to improve projects or deploy new versions without knowing what has been going on before?',
				'git'
			),
			new Skill(
				'Gradle',
				'Mix front with back technologies, auto-generated documentation and some custom dependencies with style',
				'gradle'
			)
		];
	}

}
