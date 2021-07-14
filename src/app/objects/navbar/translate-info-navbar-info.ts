import {NavbarInfo} from './navbar-info';
import {Constants} from '../constants';
import {AppComponent} from '../../app.component';
import {Section} from '../sections/section';

export class TranslateInfoNavbarInfo extends NavbarInfo {

	section: Section;
	stickTop: boolean;
	translateY: number;

	constructor(section: Section, stickTop: boolean, translateY: number) {
		super(Constants.NAVBAR_INFO.INFO);
		this.section = section;
		this.stickTop = stickTop;
		this.translateY = translateY;
	}

	execute(component: AppComponent): void {
		component.section = this.section;
		component.stickTopNav = this.stickTop;
		component.translateY = this.translateY;
	}

}
