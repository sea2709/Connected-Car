import {Component, OnInit, ViewChild} from '@angular/core';
import {pick} from 'lodash';

import {ApiService} from '../../services/api.service';
import {CustomerPinComponent} from '../../components/customer-pin/customer-pin.component';

// all available steps for customer lookup flow
const STEPS = ['SELECT_CARRIER', 'LOOKUP', 'CUS_INFO', 'ENTER_PIN', 'ACTIVATED'];

// initial/clean state
const INIT_STATE: any = {
    step: -1,
    carrier: null,
    customer: null,
    SIM: null,
    lookup: {email: '', phone: '', VIN: ''},
    userPin: '',
    sendPinError: null,
    validationError: null,
};

@Component({
    selector: 'app-customer-lookup-page',
    templateUrl: './customer-lookup-page.component.html',
    styleUrls: ['./customer-lookup-page.component.scss']
})
export class CustomerLookupPageComponent implements OnInit {
    @ViewChild('customerPin') customerPinCmp: CustomerPinComponent;

    public state: any;

    constructor(private api: ApiService) {
    }

    // set the initial state on ngInit
    ngOnInit() {
        this.resetLookup();
    }

    selectCarrier(carrier: string) {
        this.state.carrier = carrier;
        this.goNext();
    }

    /**
     * goNext Go to next step in the customer lookup flow
     */
    goNext = () => {
        const {step} = this.state;
        // get step position
        const index = STEPS.indexOf(step);

        // if step is valid, go to next step
        // otherwise go to first step
        this.state.step = STEPS[(index > -1 ? index : step) + 1];
    }

    /**
     * saveCustomer Save customer to state
     */
    saveCustomer = (customer) => {
        this.state.customer = customer;
    }

    /**
     * saveSIM Save SIM number to state
     */
    saveSIM = (SIM) => {
        this.state.SIM = SIM;
    }

    /**
     * createPIN Create the pin via api
     */
    createPIN = () => {
        return this.api.createPIN(
            this.state.customer.phone,
            this.state.SIM.SIM
        ).then((data: any) => console.log('PIN:', data.PIN));
    }

    /**
     * lookup Callback for customer lookup step (initial step)
     */
    lookup() {
        const state = this.state.lookup;

        if (this.state.loading) {
            return;
        }

        const customer = this.api.getCustomer(state.email, state.phone)
            .then(this.saveCustomer)
            .then(this.goNext)
            .catch(error => this.state.lookup.error = error);

        this.loading(customer);
        customer.then(this.loading.bind(this, false));
    }

    requestPin(resent = false) {
        const state = this.state.lookup;

        if (this.state.loading) {
            return;
        }

        const sim = this.api.getSIM(state.VIN)
            .then(this.saveSIM)
            .then(this.createPIN)
            .then(() => {
                if (!resent) {
                    this.goNext();
                }

                setTimeout(() => {
                    this.customerPinCmp.finishedRequestPin();
                });
            })
            .catch(error => this.state.SIM.error = error);

        this.loading(sim);
        sim.then(this.loading.bind(this, false));
    }

    /**
     * sendPin Send a request to save pin for customer
     * @param {string} pin Customer pin
     */
    sendPin(pin: string) {
        if (this.state.loading) {
            return;
        }

        const pin$ = this.api.sendPIN(
            this.state.customer.phone,
            this.state.SIM.SIM
        ).then(this.goNext).catch(error => this.state.sendPinError = error);

        this.loading(pin$);
        pin$.then(this.loading.bind(this, false));
    }

    /**
     * enterPin Send a request to save pin for customer
     * @param {string} pin Customer pin
     */
    enterPin(pin: string) {
        if (this.state.loading) {
            return;
        }

        const provisioning = this.api.validatePIN(
            this.state.customer.phone,
            this.state.SIM.SIM,
            pin
        )
            .then(() => this.api.provision(this.state.SIM.SIM))
            .then(this.goNext)
            .catch(error => this.state.validationError = error);

        this.loading(provisioning);
        provisioning.then(this.loading.bind(this, false));
    }

    /**
     * resetLookup Reset the lookup state, and go to first step
     */
    resetLookup() {
        this.state = {...INIT_STATE};
        this.state.lookup = {phone: '', email: '', VIN: '', ...this.state.lookup};

        this.goNext();
    }

    /**
     * loading Set a loading state for the app
     * @param {any} toggle Indicate the loading state
     */
    loading(toggle) {
        this.state.loading = toggle !== undefined ? toggle : !this.state.loading;
    }
}
