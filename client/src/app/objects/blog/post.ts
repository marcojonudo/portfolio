import {Dayjs} from 'dayjs';
import * as dayjs from 'dayjs';

export class Post {

	title: string;
	author: string;
	content: string;
	date: Dayjs;
	header: string;
	headerBackground: string;
	logo: string;
	color: string;
	path: string;
	comments: Comment[];

	constructor(post: any) {
		this.title = post.title;
		this.author = post.author;
		this.content = post.content;
		this.date = dayjs(post.date);
		this.header = post.header;
		this.headerBackground = post.headerBackground;
		this.logo = post.logo;
		this.color = post.color;
		this.path = post.path;
	}

}
