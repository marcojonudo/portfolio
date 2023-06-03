export class Palette {

	primaryColor: string;
	textColor: string;
	backgroundColor: string;
	light: boolean;
	darkTranslucidBackgroundColor: string; // TODO

	constructor(primaryColor: string, textColor: string, backgroundColor: string, light: boolean) {
		this.primaryColor = primaryColor;
		this.textColor = textColor;
		this.backgroundColor = backgroundColor;
		this.light = light;
	}

	buildBackgroundImage(): string {
		return `linear-gradient(${this.backgroundColor} 0%, ${this.backgroundColor} 100%), url('/assets/img/tiles-background.gif')`;
	}

	buildTranslucentStyles(): any {
		return {
			'background-color': this.primaryColor,
			color: this.textColor,
			'box-shadow': '0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12)',
			transition: 'color .2s, background-color .2s, width .2s, transform .2s'
		};
	}

	buildBlogPreviewStyles(): any {
		return {
			'background-color': this.textColor,
			color: this.primaryColor
		};
	}

}
