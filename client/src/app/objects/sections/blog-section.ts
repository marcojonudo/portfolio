import {Section} from './section';
import {Constants} from '../constants';

export class BlogSection extends Section {

	constructor() {
		super(Constants.SECTION.BLOG, 0, -100);
	}

}
