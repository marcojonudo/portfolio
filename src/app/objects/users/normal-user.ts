import {User} from './user';
import {Constants} from '../constants';
import {Section} from '../sections/section';

export class NormalUser implements User {

    type: string;

    constructor() {
        this.type = Constants.USER.NORMAL;
    }

    buildStyleObject(section: Section): { [key: string]: string } {
        return {transform: section.buildTranslateProperty()};
    }

}
