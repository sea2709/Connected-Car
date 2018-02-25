import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Component for the customer lookup initial form
 */

@Component({
    selector: 'app-customer-select-carrier',
    templateUrl: './customer-select-carrier.component.html',
    styleUrls: ['./customer-select-carrier.component.scss'],
})

export class CustomerSelectCarrierComponent {
    @Input() state: any = {};
    @Output() selectCarrier: EventEmitter<any> = new EventEmitter;

    select(index: number) {
        this.selectCarrier.emit(index);
    }
}
