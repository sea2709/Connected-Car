import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
})

export class CustomerComponent {
    @Input() customer: any = {};
}
