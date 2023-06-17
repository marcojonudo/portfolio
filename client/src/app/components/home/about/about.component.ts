import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, Input } from '@angular/core';
import { User } from '../../../objects/users/user';
import { Palette } from '../../../objects/palette/palette';
import { ScrollService } from '../../../services/scroll.service';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

	@Input() user: User;
	@Input() palette: Palette;

	translateX: number;
	opacity: number;
	blur: number;

	constructor(private scrollService: ScrollService, private cdRef: ChangeDetectorRef) {
		this.translateX = 0;
		effect(() => {
			const scrollTop = this.scrollService.scrollTop();
			if (scrollTop !== undefined) {
				this.translateX = this.findScrollAnimationValue(scrollTop);
				this.opacity = this.findScrollAnimationValue(scrollTop, 1, this.opacity);
				this.blur = 20 - this.findScrollAnimationValue(scrollTop, 20, this.blur);
				this.cdRef.detectChanges();
			}
		});
	}

	findScrollAnimationValue(
		scrollTop: number, threshold: number = 100, previousTranslateX: number = this.translateX
	): number {
		const translateX = this.calcTranslateX(scrollTop, threshold);
		if (translateX > previousTranslateX) {
			return translateX > threshold ? threshold : translateX;
		}
		return translateX;
	}

	calcTranslateX(scrollTop: number, threshold: number): number {
		return scrollTop * threshold / 600;
	}

}
