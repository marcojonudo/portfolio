import {Dayjs} from 'dayjs';
import * as dayjs from 'dayjs';

export class Post {

	title: string;
	content: string;
	date: Dayjs;
	header: string;
	headerBackground: string;
	logo: string;

	constructor(post: any) {
		this.title = post.title;
		this.content = post.content;
		this.date = dayjs(post.date);
		this.header = post.header;
		this.headerBackground = post.headerBackground;
		this.logo = post.logo;
	}

}
