import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Component for select carrier
 */

@Component({
    selector: 'app-customer-select-carrier',
    templateUrl: './customer-select-carrier.component.html',
    styleUrls: ['./customer-select-carrier.component.scss'],
})

export class CustomerSelectCarrierComponent {
    @Input() state: any = {};
    @Output() selectCarrier: EventEmitter<any> = new EventEmitter;

    select(carrier: string) {
        // emit select carrier event with the carrier as payload
        this.selectCarrier.emit(carrier);
    }
}
