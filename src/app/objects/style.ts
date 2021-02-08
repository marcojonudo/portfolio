export class Style {

    property: string;
    value: string;

    constructor() {
        this.property = '';
        this.value = '';
    }

    isEmpty(): boolean {
        return this.property === '' && this.value === '';
    }

    isFilled(): boolean {
        return this.property !== '' && this.value !== '';
    }

    empty(): void {
        this.property = '';
        this.value = '';
    }

}
