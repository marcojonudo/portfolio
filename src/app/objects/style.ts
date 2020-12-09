export class Style {

    property: string;
    value: string;

    constructor() {
        this.property = '';
        this.value = '';
    }

    empty(): boolean {
        return this.property === '' && this.value === '';
    }

    filled(): boolean {
        return this.property !== '' && this.value !== '';
    }

}
