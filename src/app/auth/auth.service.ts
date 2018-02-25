import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';

import * as auth0 from 'auth0-js';

import {environment} from '../../environments/environment';
import {User} from '../models/user.model';
const {AUTH_CONFIG} = environment;

@Injectable()
export class AuthService {
    // we only need access to openid
    requestedScopes = 'openid';

    // initialize the web sdk for auth0
    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: AUTH_CONFIG.callbackURL,
        scope: this.requestedScopes,
    });

    constructor(public router: Router) {
    }

    /**
     * login Logs user in with auth0
     *
     * @param {string} username
     * @param {string} password
     *
     * @return {Promise<error>} Only if there's an error (invalid user)
     *                          , an error will be returned
     */
    public login(username: string, password: string) {
        return new Promise((resolve, reject) => {
            this.auth0.login({
                username, password,
                realm: 'Username-Password-Authentication',
            }, (error) => error && reject(error));
        });
    }

    /**
     * handleAuthentication Handle the authentication from the url hash
     *
     * @return {Promise<authResult, error>} Returns the authresult or the error from authentication
     */
    public handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => err ? reject(err) : resolve(authResult));
        }).then(authResult => authResult && this.setSession(authResult));
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        // If there is a value on the `scope` param from the authResult,
        // use it to set scopes in the session for the user. Otherwise
        // use the scopes as requested. If no scopes were requested,
        // set it to nothing
        const scopes = authResult.scope || this.requestedScopes || '';

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('scopes', JSON.stringify(scopes));
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('scopes');

        // Go back to the home route
        this.router.navigate(['/login']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public getLoggedInUser(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            setTimeout(() => {
                const user = new User();
                user.name = 'John Snow';
                user.role = 'Dealer';
                user.avatar = '/assets/user-placeholder.jpg';

                resolve(user);
            }, 250);
        });
    }
}
