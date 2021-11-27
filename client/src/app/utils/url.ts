import { environment } from '../../environments/environment';

export class Url {

	static posts(): string {
		return `${environment.serverUrl}/posts`;
	}

}
