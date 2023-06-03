import { Palette } from './palette';

export class DarkBluePalette extends Palette {

	constructor() {
		super('rgb(217, 217, 217)', '#001753', 'rgba(9, 32, 63, 0.97)', false);
	}

	buildBlogPreviewStyles(): any {
		return {
			'background-color': this.primaryColor,
			color: this.textColor
		};
	}

}
