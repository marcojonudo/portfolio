import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ElementService {

	getNativeElement(element: any): any {
		return element.nativeElement;
	}

	getBoundingClientRect(element: any): any {
		return element.nativeElement.getBoundingClientRect();
	}

}
