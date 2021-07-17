import {NavbarInfo} from './navbar-info';
import {Constants} from '../constants';
import {SectionSelectorComponent} from '../../components/section-selector/section-selector.component';

export class TranslateInfoNavbarInfo extends NavbarInfo {

	stickTop: boolean;
	translateY: number;

	constructor(translateY: number, stickTop: boolean = false) {
		super(Constants.NAVBAR_INFO.INFO);
		this.translateY = translateY;
		this.stickTop = stickTop;
	}

	execute(component: SectionSelectorComponent): void {
		component.stickTop = this.stickTop;
		component.translateY = this.translateY;
	}

}
