import {Section} from '../sections/section';
import {Style} from '../style';

export interface User {

	type: string;

	buildStyleObject(section: Section, styles: Style[]): { [key: string]: string };

}
