import {Style} from './style';

export class StyleIndex {

    style: Style;
    index: number;

    constructor(index: number = 0) {
        this.style = new Style();
        this.index = index;
    }

}
