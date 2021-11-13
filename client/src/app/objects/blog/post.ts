import {Dayjs} from 'dayjs';
import * as dayjs from 'dayjs';

export class Post {

	name: string;
	title: string;
	day: Dayjs;
	image: string;

	constructor(post: any) {
		this.name = post.name;
		this.title = post.title;
		this.day = dayjs(post.day);
		this.image = post.image;
	}

}
