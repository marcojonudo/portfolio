import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class WindowService {

	getWidth(): number {
		return window.innerWidth;
	}

	getHeight(): number {
		return window.innerHeight;
	}

}
