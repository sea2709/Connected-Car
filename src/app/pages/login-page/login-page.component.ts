import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    public state: any = {
        loading: true, // mark state when request is sent to auth0
        errors: {}, // store any errors
    };

    public user = {
        username: '',
        password: '',
    };

    // key to store/retrieve redirect param from localstorage
    private lsParamName = 'x-state-redirectTo';
    private queryParams: Params = null;

    constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        // save the query params (look for redirectTo param)
        this.route.queryParams.subscribe((params: Params) => {
            this.queryParams = params;
        });

        // check if any auth params are in the url,
        // and check if user is logged in
        // if user is logged in, redirect to last url, or to root
        this.auth.handleAuthentication()
            .then(() => {
                const redirectTo = this.redirectUrl || '/';
                this.clearRedirectTo();

                this.router.navigate([redirectTo]);
            }, (err) => console.log(err))
            .then(() => this.state.loading = false);
    }

    /**
     * redirectUrl Get the next redirect url either from query params
     * or from the localstorage
     */
    get redirectUrl() {
        if (this.queryParams && this.queryParams.redirectTo) {
            return this.queryParams.redirectTo;
        }

        const redirectTo = localStorage.getItem(this.lsParamName);
        if (redirectTo) {
            return redirectTo;
        }
    }

    /**
     * isValidInput Return if there are any input errors
     */
    get isValidInput() {
        return !(this.state.errors['username'] || this.state.errors['password']);
    }

    /**
     * clearRedirectTo Remove the redirect url from localstorage
     */
    clearRedirectTo() {
        localStorage.removeItem(this.lsParamName);
    }

    /**
     * login Log user in using auth0
     */
    login() {
        const {username, password} = this.user;

        this.clearErrors();

        // mark invalid inputs, if there are any
        this.state.errors['username'] = !(username && username.trim());
        this.state.errors['password'] = !(password && password.trim());

        // return if there are any errors
        if (this.state.errors['username'] || this.state.errors['password']) {
            return;
        }

        // if there's a redirect url in queryParams, save it in localstorage
        if (this.redirectUrl) {
            localStorage.setItem(this.lsParamName, this.redirectUrl);
        }

        // mark state as loading (request is made to auth0)
        this.state.loading = true;
        this.auth.login(this.user.username.trim(), this.user.password.trim())
            .catch(this.handleAuthFailed);
    }

    /**
     * handleAuthFailed Handle authentication errors
     */
    handleAuthFailed = (e) => {
        this.state.loading = false;
        this.state.errors['auth'] = e.error_description;
    }

    /**
     * clearErrors Clear all state errors
     */
    clearErrors() {
        this.state.errors = {};
    }
}
