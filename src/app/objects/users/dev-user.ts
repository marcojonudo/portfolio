import {User} from './user';
import {Constants} from '../constants';
import {Section} from '../sections/section';
import {Style} from '../style';

export class DevUser implements User {

	type: string;

	constructor() {
		this.type = Constants.USER.DEV;
	}

	buildStyleObject(section: Section, styles: Style[]): { [key: string]: string } {
		const styleObject = {};
		styles.forEach((style: Style) => {
			styleObject[style.property] = style.value;
		});
		return styleObject;
	}

}
