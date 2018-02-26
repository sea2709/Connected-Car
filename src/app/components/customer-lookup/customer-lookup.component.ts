import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

/**
 * Component for the customer lookup initial form
 */

@Component({
    selector: 'app-customer-lookup',
    templateUrl: './customer-lookup.component.html',
    styleUrls: ['./customer-lookup.component.scss'],
})

export class CustomerLookupComponent {
    @ViewChild('phone') public $phone: any;
    @ViewChild('email') public $email: any;
    @ViewChild('vin') public $vin: any;

    @Input() carrier: string;
    @Input() state: any = {};
    @Input() apiError: any = {};
    @Output() lookup: EventEmitter<any> = new EventEmitter;

    submit() {
        // emit lookup event
        this.lookup.emit();
    }

    public getInputError(input: any): string {
        if (input.errors) {
            if (input.errors['required']) {
                return 'required';
            }

            if (input.errors['pattern']) {
                return 'pattern-invalid';
            }

            return 'invalid';
        }

        return '';
    }

    /**
     * based on the selected carrier, show the appropriate placeholder for the phone input field
     * @returns {string}
     */
    public getPhonePlaceholder(): string {
        switch (this.carrier) {
            case 'T-MOBILE':
                return 'T-Mobile Number';
            case 'SPRINT':
                return 'Sprint Number';
            case 'AT-T':
                return 'AT&T Number';
            case 'VERIZON':
                return 'Verizon Number';
        }
    }
}
