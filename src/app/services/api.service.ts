import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
const { api } = environment;

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * url Get the api url for the specified endpoint
   * @param {string} endpoint
   */
  url(endpoint) {
    return `${api.baseURL}${api[endpoint]}`;
  }

  /**
   * auth Auth headers
   */
  get auth() {
    return {headers: {'Authorization': `Bearer ${api.jwt}`}};
  }

  /**
   * getCustomer Get the customer based on email & phone
   * @param {string} email
   * @param {string} phone
   */
  getCustomer(email: string, phone: string) {
    return this.http.post(this.url('customer'), {email, phone}, this.auth).toPromise();
  }

  /**
   * getSIM Get the sim number based on the VIN
   * @param {string} VIN
   */
  getSIM(VIN: string) {
    return this.http.post(this.url('sim'), {VIN}, this.auth).toPromise();
  }

  /**
   * createPIN Create pin for a customer
   * @param {string} phoneNumber
   * @param {string} SIM
   */
  createPIN(phoneNumber: string, SIM: string) {
    return this.http.post(this.url('createPin'), {phoneNumber, SIM}, this.auth).toPromise();
  }

  /**
   * sendPIN Send pin to customer number
   * @param {string} phoneNumber
   * @param {string} SIM
   */
  sendPIN(phoneNumber: string, SIM: string) {
    return this.http.post(this.url('sendPin'), {phoneNumber, SIM}, this.auth).toPromise();
  }

  /**
   * validatePIN Validate the user entered pin
   * @param {string} phoneNumber
   * @param {string} SIM
   * @param {string} PIN
   */
  validatePIN(phoneNumber: string, SIM: string, PIN: string) {
    return this.http.post(this.url('validatePin'), {phoneNumber, SIM, PIN}, this.auth).toPromise();
  }

  /**
   * provision Provision customer
   * @param {string} SIM
   */
  provision(SIM: string) {
    return this.http.post(this.url('provision'), {SIM}, this.auth).toPromise();
  }
}
