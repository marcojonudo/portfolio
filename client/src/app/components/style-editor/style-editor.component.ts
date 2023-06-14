import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	Input,
	QueryList,
	ViewChildren
} from '@angular/core';
import { StyleIndex } from '../../objects/style-index';
import { Coordinates } from '../../objects/coordinates';
import { animate, style, transition, trigger } from '@angular/animations';
import { Constants } from '../../utils/constants';
import { Palette } from '../../objects/palette/palette';
import { AestheticsService } from '../../services/aesthetics.service';

@Component({
	selector: 'app-style-editor',
	templateUrl: './style-editor.component.html',
	styleUrls: ['./style-editor.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('inOutAnimation', [
			transition(
				':enter',
				[
					style({ opacity: 0 }),
					animate('.2s', style({ opacity: 1 }))
				]
			),
			transition(
				':leave',
				[
					style({ opacity: 1 }),
					animate('.2s', style({ opacity: 0 }))
				]
			)
		])
	]
})
export class StyleEditorComponent {

	@HostBinding('class.opened') opened: boolean;

	@ViewChildren('styleProperty', { read: ElementRef }) properties: QueryList<ElementRef>;
	@ViewChildren('styleValue', { read: ElementRef }) values: QueryList<ElementRef>;

	@Input() coordinates: Coordinates;
	@Input() palette: Palette;

	styles: StyleIndex[];
	addedStyles: StyleIndex[];
	styledDivs: string[];
	selectedDiv: string;

	constructor(private aestheticsService: AestheticsService) {
		this.addedStyles = [];
		this.styledDivs = Object.values(Constants.STYLED_DIV);
		this.selectedDiv = this.styledDivs[0];
		this.styles = [new StyleIndex(this.selectedDiv)];
	}

	findTransform(): string {
		return `translate3d(${this.coordinates?.x}px, ${this.coordinates?.y}px, 0)`;
	}

	toggleOpened(): void {
		this.opened = !this.opened;
	}

	updateDiv(selectedDiv: string = this.selectedDiv, styles: StyleIndex[] = this.styles): void {
		styles.forEach(s => {
			s.style.div = selectedDiv;
		});
		this.aestheticsService.styles.set(styles.map(s => s.style).slice(0, styles.length - 1));
	}

	checkDisabledTrash(styleIndex: StyleIndex): boolean {
		return styleIndex.index === 0 && styleIndex.style.isEmpty();
	}

	setProperty(s: StyleIndex, properties: QueryList<ElementRef> = this.properties): void {
		s.style.property = properties.toArray()[s.index].nativeElement.innerHTML;
		this.handleStyle(s);
	}

	setValue(s: StyleIndex, values: QueryList<ElementRef> = this.values): void {
		s.style.value = values.toArray()[s.index].nativeElement.innerHTML;
		this.handleStyle(s);
	}

	handleStyle(
		styleIndex: StyleIndex,
		styles: StyleIndex[] = this.styles,
		addedStyles: StyleIndex[] = this.addedStyles,
		selectedDiv: string = this.selectedDiv
	): void {
		if (styleIndex.style.isEmpty()) {
			if (styleIndex.index < styles.length - 1) {
				this.removeStyle(styleIndex.index);
			}
		} else if (styleIndex.style.isFilled()) {
			const addedStyle = addedStyles.find(s => s.style === styleIndex.style);
			if (!addedStyle) {
				styles.push(new StyleIndex(selectedDiv, styles.length));
				addedStyles.push(styleIndex);
			}
		}
		this.aestheticsService.styles.set(styles.map(s => s.style).slice(0, styles.length - 1));
	}

	removeStyleFromTrash(styleIndex: StyleIndex, styles: StyleIndex[] = this.styles, selectedDiv: string = this.selectedDiv): void {
		/* Si se aprieta la papelera y sólo hay un elemento, no se debe eliminar, sino vaciar */
		if (styles.length === 1) {
			/* Para evitar problemas de actualizaciones de la interfaz, en lugar de vaciar el contenido, se reemplaza por un style vacío */
			styles.splice(0, 1, new StyleIndex(selectedDiv, 0));
		} else {
			this.removeStyle(styleIndex.index);
		}
		this.aestheticsService.styles.set(styles.map(s => s.style).slice(0, styles.length - 1));
	}

	removeStyle(index: number, styles: StyleIndex[] = this.styles): void {
		styles.splice(index, 1);
		for (let i = index; i < styles.length; i++) {
			styles[i].index -= 1;
		}
	}

}
