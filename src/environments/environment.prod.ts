export const environment = {
    production: true,

    AUTH_CONFIG: {
        clientID: 't3OmbcL62U6TMSuvKLOh7XGtuslmueHB',
        domain: 'hdang.auth0.com',
        callbackURL: 'https://conn-car-tcm-hdang.herokuapp.com/login',
    },

    api: {
        /* tslint:disable */
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTAyLTEyVDE2OjA0OjU3LjAyNloiLCJpYXQiOjE1MTg0NTE0OTcsImV4cCI6MTUyNzA5MTQ5N30.9aSdKxZIXtR4VKMwriBUgc_fbikSXhLzG0nE3RMgNrI',
        baseURL: 'https://conn-car-tcm-hdang.herokuapp.com',
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
