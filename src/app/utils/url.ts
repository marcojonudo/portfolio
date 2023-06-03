import { environment } from '../../environments/environment';
import { Constants } from './constants';

export class Url {

	static posts(serverUrl = Constants.DOMAIN): string {
		return `${serverUrl}/posts`;
	}

	static comments(): string {
		return `${environment.serverUrl}/comments`;
	}

	static getComments(postPath: string): string {
		return `${environment.serverUrl}/comments/${postPath}`;
	}

}
