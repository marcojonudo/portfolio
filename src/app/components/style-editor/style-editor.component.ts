import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { StyleIndex } from '../../objects/style-index';
import { NavService } from '../../services/nav.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Coordinates } from '../../objects/coordinates';

@Component({
	selector: 'app-style-editor',
	templateUrl: './style-editor.component.html',
	styleUrls: ['./style-editor.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StyleEditorComponent {

	styles: StyleIndex[];
	addedStyles: StyleIndex[];
	coordinates: Coordinates;

	constructor(private navService: NavService, private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) {
		this.styles = [new StyleIndex()];
		this.addedStyles = [];

		this.coordinates = new Coordinates();
		this.navService.coordinates$.subscribe(coordinates => {
			this.coordinates = coordinates;
			this.cdRef.detectChanges();
		});
	}

	findTransform(): string {
		return `translate3d(${this.coordinates.x}px, ${this.coordinates.y}px, 0)`;
	}

	checkDisabledTrash(styleIndex: StyleIndex): boolean {
		return styleIndex.index === 0 && styleIndex.style.isEmpty();
	}

	setProperty(style: StyleIndex): void {
		style.style.property = document.getElementById(`property-elem-${style.index}`).innerHTML;
		this.handleStyle(style);
	}

	setValue(style: StyleIndex): void {
		style.style.value = document.getElementById(`value-elem-${style.index}`).innerHTML;
		this.handleStyle(style);
	}

	handleStyle(
		style: StyleIndex,
		styles: StyleIndex[] = this.styles,
		addedStyles: StyleIndex[] = this.addedStyles
	): void {
		if (style.style.isEmpty()) {
			if (style.index < styles.length - 1) {
				this.removeStyle(style.index);
			}
		} else if (style.style.isFilled()) {
			const addedStyle = addedStyles.find(s => s.style === style.style);
			if (!addedStyle) {
				styles.push(new StyleIndex(styles.length));
				addedStyles.push(style);
			}
		}
		NotificationService.notifyStyles(styles.map(s => s.style).slice(0, styles.length - 1));
	}

	removeStyleFromTrash(style: StyleIndex, styles: StyleIndex[] = this.styles): void {
		/* Si se aprieta la papelera y sólo hay un elemento, no se debe eliminar, sino vaciar */
		if (styles.length === 1) {
			/* Para evitar problemas de actualizaciones de la interfaz, en lugar de vaciar el contenido, se reemplaza por un style vacío */
			styles.splice(0, 1, new StyleIndex(0));
		} else {
			this.removeStyle(style.index);
		}
		NotificationService.notifyStyles(styles.map(s => s.style).slice(0, styles.length - 1));
	}

	removeStyle(index: number, styles: StyleIndex[] = this.styles): void {
		styles.splice(index, 1);
		for (let i = index; i < styles.length; i++) {
			styles[i].index -= 1;
		}
	}

}
