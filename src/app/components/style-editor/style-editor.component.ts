import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-style-editor',
    templateUrl: './style-editor.component.html',
    styleUrls: ['./style-editor.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StyleEditorComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
