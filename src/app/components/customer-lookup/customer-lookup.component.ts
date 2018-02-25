import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';

/**
 * Component for the customer lookup initial form
 */

@Component({
    selector: 'app-customer-lookup',
    templateUrl: './customer-lookup.component.html',
    styles: [],
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
        this.lookup.emit();
    }

    /**
     * getFormErrors Get current form errors from phone and email input fields
     */
    getFormErrors() {
        const phone = this.$phone.errors || {};
        const email = this.$email.errors || {};
        const vin = this.$vin.errors || {};

        if (phone.required || email.required || vin.required) {
            return 'required';
        }

        if (phone.pattern) {
            return 'phone-invalid';
        }

        if (email.pattern) {
            return 'email-invalid';
        }

        if (vin.pattern) {
            return 'vin-invalid';
        }
    }

    getPhonePlaceholder() {
        switch (this.carrier) {
            case 'T-MOBILE':
                return 'T-Mobile Number';
            case 'SPRINT':
                return 'Sprint Number';
            case 'AT-T':
                return 'AT&T Number';
            case 'VERISON':
                return 'Verizon Number';
        }
    }
}
