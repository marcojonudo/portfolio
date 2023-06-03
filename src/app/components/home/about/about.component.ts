import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input, OnDestroy
} from '@angular/core';
import { User } from '../../../objects/users/user';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Palette } from '../../../objects/palette/palette';
import { ScrollService } from '../../../services/scroll.service';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnDestroy {

	@Input() user: User;
	@Input() palette: Palette;

	translateX: number;
	opacity: number;
	blur: number;

	scrollSubscription: Subscription;

	constructor(
		private scrollService: ScrollService,
		private cdRef: ChangeDetectorRef
	) {
		this.translateX = 0;
		setTimeout(
			() => {
				this.scrollSubscription = this.scrollService.scrollTop$.pipe(
					tap(scrollData => {
						this.translateX = this.findScrollAnimationValue(scrollData.scrollTop);
						this.opacity = this.findScrollAnimationValue(scrollData.scrollTop, 1, this.opacity);
						this.blur = 20 - this.findScrollAnimationValue(scrollData.scrollTop, 20, this.blur);
					}),
					tap(() => this.cdRef.detectChanges())
				).subscribe();
			},
			0
		);
	}

	ngOnDestroy(): void {
		if (this.scrollSubscription) {
			this.scrollSubscription.unsubscribe();
		}
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
