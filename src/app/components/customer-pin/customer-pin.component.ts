import {Component, Input, Output, EventEmitter, ViewChild, OnInit} from '@angular/core';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-customer-pin',
    templateUrl: './customer-pin.component.html',
    styles: ['./customer-pin.component.scss'],
})

export class CustomerPinComponent implements OnInit {
    @Input() apiError: any = {};
    @Output() confirm: EventEmitter<any> = new EventEmitter;
    @Output() requestPin: EventEmitter<any> = new EventEmitter;

    @ViewChild('progressBar') progressBar: ProgressBarComponent;
    @ViewChild('form') form: NgForm;

    // the customer pin model
    public pin = '';
    public isPinExpired = false;

    ngOnInit(): void {
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
