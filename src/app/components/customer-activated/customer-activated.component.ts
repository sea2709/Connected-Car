import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

/**
 * Component for the customer lookup initial form
 */

@Component({
    selector: 'app-customer-activated',
    templateUrl: './customer-activated.component.html',
    styleUrls: ['./customer-activated.component.scss'],
})

export class CustomerActivatedComponent {
    @Input() customer: any = {};
    @Output() done: EventEmitter<any> = new EventEmitter;

    // press Enter to submit form / go to next step
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.charCode === 13) {
            this.submit();
        }
    }

    submit() {
        this.done.emit();
    }
}
