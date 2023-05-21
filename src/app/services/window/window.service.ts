import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class WindowService {

	getHeight(): number {
		return window.innerHeight;
	}

}
