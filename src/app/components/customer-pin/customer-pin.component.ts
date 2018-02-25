import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';
import {NgForm} from '@angular/forms';
import {environment} from '../../../environments/environment';

const {app} = environment;

@Component({
    selector: 'app-customer-pin',
    templateUrl: './customer-pin.component.html',
    styleUrls: ['./customer-pin.component.scss'],
})

export class CustomerPinComponent implements OnInit {
    @Input() apiError: any = {};
    @Input() carrier: string;
    @Output() confirm: EventEmitter<any> = new EventEmitter;
    @Output() requestPin: EventEmitter<any> = new EventEmitter;

    @ViewChild('progressBar') progressBar: ProgressBarComponent;
    @ViewChild('form') form: NgForm;

    // the customer pin model
    public pin = '';
    public isPinExpired = false;
    public timePinExpired = 60;

    ngOnInit(): void {
        this.timePinExpired = app.timePinExpired;
        this.progressBar.reset();
        this.progressBar.start();
    }

    submit() {
        // emit confirm event with the customer pin as payload
        this.confirm.emit(this.pin);
    }

    validatePin() {
        return (!this.isPinExpired) && (this.pin) && (this.pin.length === 4);
    }

    requesetNewPin() {
        this.requestPin.emit();
        this.form.resetForm();
    }

    expirePin() {
        this.isPinExpired = true;
    }

    finishedRequestPin() {
        this.progressBar.reset();
        this.progressBar.start();

        this.pin = '';
        this.isPinExpired = false;
    }
}
