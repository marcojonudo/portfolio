import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {Style} from '../../objects/style';
import {NotificationService} from '../../services/notification.service';
import {StyleIndex} from '../../objects/style-index';

@Component({
    selector: 'app-style-editor',
    templateUrl: './style-editor.component.html',
    styleUrls: ['./style-editor.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StyleEditorComponent {

    styles: Style[];
    addedStylesIndexes: number[];

    constructor() {
        this.styles = [new Style()];
        this.addedStylesIndexes = [];
    }

    setProperty(i: number, styles: Style[] = this.styles): void {
        styles[i].property = document.getElementById(`property-elem-${i}`).innerHTML;
        this.handleStyle(i, styles[i]);
    }

    setValue(i: number, styles: Style[] = this.styles): void {
        styles[i].value = document.getElementById(`value-elem-${i}`).innerHTML;
        this.handleStyle(i, styles[i]);
    }

    handleStyle(i: number, style: Style): void {
        if (i > 0 && style.empty()) {
            this.styles.splice(i, 1);
        }
        if (style.filled()) {
            const existentAddedStylesIndex = this.addedStylesIndexes.indexOf(i);
            if (existentAddedStylesIndex === -1) {
                this.styles.push(new Style());
                this.addedStylesIndexes.push(i);
            }
            NotificationService.notifyStyleIndex(new StyleIndex(style, i));
        }
    }

}
