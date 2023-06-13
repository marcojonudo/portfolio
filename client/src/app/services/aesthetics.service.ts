import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Palette } from '../objects/palette/palette';
import { LightBluePalette } from '../objects/palette/light-blue-palette';
import { DarkBluePalette } from '../objects/palette/dark-blue-palette';
import { LightGreenPalette } from '../objects/palette/light-green-palette';

@Injectable({
	providedIn: 'root'
})
export class AestheticsService {

	palettes: Palette[];
	palette: WritableSignal<Palette>;

	constructor() {
		this.palettes = [new LightBluePalette(), new LightGreenPalette(), new DarkBluePalette()];
		this.palette = signal(this.palettes[0]);
	}

	findSelectedIndex(palette: Signal<Palette> = this.palette, palettes: Palette[] = this.palettes): number {
		return palettes.indexOf(palette());
	}

	togglePalette(palettes: Palette[] = this.palettes): void {
		const findSelectedIndex = this.findSelectedIndex();
		const newIndex = (findSelectedIndex + 1) % palettes.length;
		this.palette.set(this.palettes[newIndex]);
	}

}
