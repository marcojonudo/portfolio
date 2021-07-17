import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-blog-preview',
	templateUrl: './blog-preview.component.html',
	styleUrls: ['./blog-preview.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPreviewComponent {}
