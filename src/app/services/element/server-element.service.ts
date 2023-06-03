import { Injectable } from '@angular/core';
import { ElementService } from './element.service';

@Injectable({
	providedIn: 'root'
})
export class ServerElementService extends ElementService {

	getNativeElement(element: any): any {
		return {};
	}

	getBoundingClientRect(element: any): any {
		return {};
	}

}
