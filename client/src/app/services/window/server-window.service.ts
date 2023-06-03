import { Injectable } from '@angular/core';
import { WindowService } from './window.service';

@Injectable({
	providedIn: 'root'
})
export class ServerWindowService extends WindowService {

	getHeight(): number {
		return 0;
	}

}
