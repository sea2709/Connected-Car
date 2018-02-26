// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,

    AUTH_CONFIG: {
        clientID: 'LC6MLt8BpgPVGAm3CGTXwivdeD10Yi8A',
        domain: 'dev-test-smr.auth0.com',
        callbackURL: 'http://localhost:4200/login',
    },

    api: {
        /* tslint:disable */
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTAyLTEyVDE2OjA0OjU3LjAyNloiLCJpYXQiOjE1MTg0NTE0OTcsImV4cCI6MTUyNzA5MTQ5N30.9aSdKxZIXtR4VKMwriBUgc_fbikSXhLzG0nE3RMgNrI',
        baseURL: 'https://tcm-connected-car.herokuapp.com',
        customer: '/api/v1/Customer/Lookup',
        sim: '/api/v1/SIM/Lookup',
        createPin: '/api/v1/PIN/Create',
        sendPin: '/api/v1/PIN/Send',
        validatePin: '/api/v1/PIN/Input',
        provision: '/api/v1/Provisioning',
        /* tslint:enable */
    },

    app: {
        name: 'Connected Car Activation Portal',
        clients: {
            volkswagen: {
                name: 'Volkswagen',
                logo: '/assets/volkswagen/logo.png',
                theme: 'volkswagen-theme',
                active: 1
            },
            infiniti: {
                name: 'Infiniti',
                logo: '/assets/infiniti/logo.png',
                theme: 'infiniti-theme',
                active: 0
            },
            gm: {
                name: 'General Motors',
                logo: '/assets/gm/logo.png',
                theme: 'gm-theme',
                active: 0
            },
        },
        timePinExpired: 60
    },
};
