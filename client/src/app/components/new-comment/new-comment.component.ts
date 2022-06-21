import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Comment } from '../../objects/blog/comment';

@Component({
	selector: 'app-new-comment',
	templateUrl: './new-comment.component.html',
	styleUrls: ['./new-comment.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCommentComponent {

	@Input() postPath: string;
	@Input() parent: Comment;
	@Input() translucentStyles: any;

	@Output() newCommentEmitter: EventEmitter<Comment>;

	form: FormGroup;

	constructor(private blogService: BlogService) {
		this.form = new FormGroup({
			name: new FormControl('', Validators.required),
			email: new FormControl('', [Validators.required, Validators.email]),
			message: new FormControl('', Validators.required)
		});
		this.newCommentEmitter = new EventEmitter<Comment>();
	}

	uploadComment(form: FormGroup = this.form, postPath: string = this.postPath, parent: Comment = this.parent) {
		const comment = new Comment(form.value);
		comment.postPath = postPath;
		comment.parent = parent;
		this.blogService.uploadComment(comment).subscribe(c => {
			this.blogService.commentsSubject.next(comment);
			this.newCommentEmitter.emit(c);
		});
	}

}
