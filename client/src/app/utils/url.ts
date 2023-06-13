import { Constants } from './constants';

export class Url {

	static posts(serverUrl = Constants.DOMAIN): string {
		return `${serverUrl}/posts`;
	}

	static post(path: string, serverUrl = Constants.DOMAIN): string {
		return `${serverUrl}/posts/${path}`;
	}

	static comments(serverUrl = Constants.DOMAIN): string {
		return `${serverUrl}/comments`;
	}

	static getComments(postPath: string, serverUrl = Constants.DOMAIN): string {
		return `${serverUrl}/comments/${postPath}`;
	}

}
