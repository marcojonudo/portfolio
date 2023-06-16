export class ScrollData {

	top: boolean;

	constructor(public scrollTop: number, public scrollingDown: boolean = false) {
		this.top = scrollTop === 0;
	}

}
