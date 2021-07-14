import {AppComponent} from '../../app.component';

export abstract class NavbarInfo {

	type: string;

	protected constructor(type: string) {
		this.type = type;
	}

	abstract execute(component: AppComponent): void;

}
