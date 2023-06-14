import { Injectable } from '@angular/core';
import { WindowService } from './window.service';

@Injectable({
	providedIn: 'root'
})
export class ServerWindowService extends WindowService {

	getWidth(): number {
		return 0;
	}

	getHeight(): number {
		return 0;
	}

}
