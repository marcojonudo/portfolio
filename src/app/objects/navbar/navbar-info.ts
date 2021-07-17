import {SectionSelectorComponent} from '../../components/section-selector/section-selector.component';

export abstract class NavbarInfo {

	type: string;

	protected constructor(type: string) {
		this.type = type;
	}

	abstract execute(component: SectionSelectorComponent): void;

}
