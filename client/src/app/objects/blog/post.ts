import {Dayjs} from 'dayjs';
import * as dayjs from 'dayjs';

export class Post {

	title: string;
	content: string;
	date: Dayjs;
	image: string;

	constructor(post: any) {
		this.title = post.title;
		this.content = post.content;
		this.date = dayjs(post.date);
		this.image = post.image;
	}

}
