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

    styles: StyleIndex[];
    addedStyles: StyleIndex[];

    constructor() {
        this.styles = [new StyleIndex()];
        this.addedStyles = [];
    }

    setProperty(style: StyleIndex): void {
        style.style.property = document.getElementById(`property-elem-${style.index}`).innerHTML;
        this.handleStyle(style);
    }

    setValue(style: StyleIndex): void {
        style.style.value = document.getElementById(`value-elem-${style.index}`).innerHTML;
        this.handleStyle(style);
    }

    handleStyle(style: StyleIndex, styles: StyleIndex[] = this.styles): void {
        if (style.style.empty()) {
            if (style.index < styles.length - 1) {
                this.styles.splice(style.index, 1);
                for (let i = style.index; i < styles.length; i++) {
                    styles[i].index -= 1;
                }
            }
        } else if (style.style.filled()) {
            const addedStyle = this.addedStyles.find(s => s.style === style.style);
            if (!addedStyle) {
                this.styles.push(new StyleIndex(this.styles.length));
                this.addedStyles.push(style);
            }
        }
        NotificationService.notifyStyles(styles.map(s => s.style).slice(0, styles.length - 1));
    }

}
