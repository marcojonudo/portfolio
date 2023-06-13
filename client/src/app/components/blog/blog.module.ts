import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { PostCardComponent } from './post-card/post-card.component';
import { CommentComponent } from './comment/comment.component';
import { PostComponent } from './post/post.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { MarkdownModule } from 'ngx-markdown';

@NgModule({
	declarations: [
		BlogComponent,
		PostCardComponent,
		CommentComponent,
		PostComponent,
		NewCommentComponent
	],
	exports: [
		PostCardComponent
	],
	imports: [
		CommonModule,
		BlogRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		// MarkdownModule.forChild()
	]
})
export class BlogModule {}
