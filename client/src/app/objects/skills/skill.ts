import { SkillSvg } from './skill-svg';

export class Skill {

	title: string;
	description: string;
	svg: SkillSvg;

	constructor(title: string, description: string, svg: SkillSvg) {
		this.title = title;
		this.description = description;
		this.svg = svg;
	}

}
