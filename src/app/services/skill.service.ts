import { Injectable } from '@angular/core';
import { Skill } from '../objects/skills/skill';

@Injectable({
	providedIn: 'root'
})
export class SkillService {

	skills: Skill[];

	constructor() {
		this.skills = [
			new Skill(
				'Groovy',
				'Loving the oneliners and usability, but mistrusting all the dynamic possibilities',
				'groovy'
			),
			new Skill(
				'Java',
				'I\'ve recently discovered functional interfaces and streams. I know, just don\'t say it',
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
				'Docker',
				'An excellent project is not the only goal. We need a way to standardise it among the different environments',
				'docker'
			),
			new Skill(
				'Project Reactor',
				'Was curious about reactive programming, and ended loving it',
				'reactor'
			)
		];
	}
}
