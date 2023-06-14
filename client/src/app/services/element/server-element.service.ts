import { Injectable } from '@angular/core';
import { ElementService } from './element.service';

@Injectable({
	providedIn: 'root'
})
export class ServerElementService extends ElementService {

	getNativeElement(_element: any): any {
		return {};
	}

	getBoundingClientRect(_element: any): any {
		return {};
	}

}
