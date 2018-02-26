import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-pin-input',
    templateUrl: './pin-input.component.html',
    styleUrls: ['./pin-input.component.scss']
})

export class PinInputComponent implements OnInit, AfterViewInit {
    // allow the number of digits to be configurable, default is 4 digits per pin
    @Input() digits = 4;

    private _model = '';
    @Input()
    set model(pin: string) {
        this._model = pin;
        this.updateInputModel();
    }
    @Output() modelChange: EventEmitter<string> = new EventEmitter;

    // keep track of each digit in the `values` array
    public values = [];
    // keep a reference of each input element
    private inputs;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        // check if there was passed any model value,
        // and convert it to digits
        this.updateInputModel();
    }

    ngAfterViewInit() {
        // save references to input elements
        this.inputs = this.el.nativeElement.querySelectorAll('input');
        this.inputs[0].focus();
    }

    private updateInputModel() {
        const model = (this._model || '').toString();

        this.values = new Array(this.digits).fill(null);
        this.values.splice(0, model.length, ...model.split(''));
    }

    /**
     * setValue Set value for the specified digit
     * @param {number}        index  The numeric position of the updated digit
     * @param {KeyboardEvent} $event
     */
    setValue(index: number, $event: KeyboardEvent) {
        const input: any = $event.target;

        // parse the input value
        let value = input.value || '';
        // take only first digit
        value = value.toString().trim().slice(0, 1);
        // make sure it's a digit and not another character
        const isDigit = !(!value.length || isNaN(value));
        value = !isDigit ? null : +value;

        // save digit value
        this.values[index] = value;
        this.modelChange.emit(this.values.join(''));

        // force input update
        input.value = this.values[index];

        // focus next input if there's one and curent input has a non-empty value
        const next = this.inputs[index + 1];
        if (isDigit && next) {
            next.focus();
            next.select();
        }
    }

    /**
     * track Track inputs by index
     * @param {number} index
     */
    track(index: number) {
        return index;
    }
}
