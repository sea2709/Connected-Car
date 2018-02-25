import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

/**
 * Component for the customer lookup initial form
 */

@Component({
    selector: 'app-customer-info',
    templateUrl: './customer-info.component.html',
    styleUrls: ['./customer-info.component.scss'],
})

export class CustomerInfoComponent {
    @Input() customer: any = {};
    @Output() requestPin: EventEmitter<any> = new EventEmitter;

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.charCode === 13) {
            this.submit();
        }
    }

    submit() {
        this.requestPin.emit();
    }
}
