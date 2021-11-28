import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { Constants } from '../../../utils/constants';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Palette } from '../../../objects/palette/palette';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {

	palette: Palette;
	translucentStyles: any;

	constructor(
		private navService: NavService,
		private aestheticsService: AestheticsService,
		private cdRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.aestheticsService.palette$.subscribe(palette => {
			this.palette = palette;
			this.translucentStyles = palette.buildTranslucentStyles();
			this.cdRef.detectChanges();
		});
	}

	// region Getters / setters

	get normalUser(): string {
		return Constants.USER.NORMAL;
	}

	get devUser(): string {
		return Constants.USER.DEV;
	}

	// endregion

	selectUser(type: string): void {
		const user = this.navService.buildUser(type);
		this.navService.setUser(user);
	}

	checkSelectedUser(user: string, selectedUser: string = this.navService.user.type): boolean {
		return user === selectedUser;
	}

}
