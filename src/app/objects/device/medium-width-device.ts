import {Device} from './device';
import {Constants} from '../constants';

export class MediumWidthDevice extends Device {

	constructor(sectionSelectorOffset: number) {
		super(sectionSelectorOffset);
	}

	findTranslateY(scrollTop: number): string {
		let translateY = this.stickNavThreshold - scrollTop;
		translateY = translateY < 0 ? 0 : translateY;
		return `${translateY}px`;
	}

}
