# Topcoder Mobile - Connected Car Angular2 Web App Code Challenge

## Prerequisite
> [node >= 8.9.4 and npm >= 5.6](https://nodejs.org/en/download/)
> [angular-cli = 1.6.7](https://github.com/angular/angular-cli#installation)

!!! Note: this project uses the `node-sass` npm package, which, on windows machines
requires the [`node-gyp` prerequisites](https://github.com/nodejs/node-gyp#on-windows).

Install all dependencies by running `npm install` in project's root folder.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically
reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also us
`ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `-prod` flag for a production build.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Environment and configuration files
Please find the env configuration files located in `src/environments/`, as follows:
> `environment.ts` config file for development environment
> `environment.prod.ts` config file for production environment

The available configurations are:
> `production` sets current environment as production or not

> `AUTH_CONFIG` Configuration for auth0

> `AUTH_CONFIG.clientID` (String) Your Auth0 client_id

> `AUTH_CONFIG.domain` (String) Your Auth0 account domain (ex. myaccount.auth0.com)

> `AUTH_CONFIG.callbackURL` (String) The default redirectUri used. Unless it is changed
                            by development/updates to the project, it should always point to `/login`.
                            
> `api` All available/used api endpoints

> `api.jwt` Api JSON Token for authenticating api requests

> `api.baseURL` The api base url

> `app` All application configurations

> `app.name` Application Name (which is display on the left panel)

> `app.clients` The application allow to setup clients' information including: client's name, client's logo and client's theme and choose the current active client. At this point, the application support three clients : Volkswagen, Infiniti and GM
 
NOTE: At a certain point, there is only one client is active. If there are many active clients, then the first active one will be chosen.

Before building for production, please make sure you have all necessary configurations
set in `src/environments/environment.prod.ts`.
 
## Support multiple themes
All supported themes can be found in the folder /src/styles/themes. 

## 3rd party libraries used
> [normalize.css](https://necolas.github.io/normalize.css/)

> Font Awesome (https://fontawesome.com/)
!!! NOTE: the library FontAwesome will be replaced by the application icon fonts!

## CSS validation
> The warnings & errors are from `normalize.css` that tries to make all inputs/elements look the same in every browser.

## Deploying to heroku
The heroku url for current prototype is: `https://conn-car-tcm-hdang.herokuapp.com/`.

Make sure you have latest Heroku CLI installed:
``` sh
$ npm install -g heroku-cli
```

Login to heroku:
``` sh
$ heroku login
```

Create the heroku application:
``` sh
$ heroku apps:create <application-name>
```
Replace `<application-name>` with the name of the application you'd like. eg:
``` sh
$ heroku apps:create conn-car-tcm-hdang
```

Build the application:
``` sh
$ ng build -prod
```

Add the code to your heroku instance:
``` sh
$ git add .
$ git add -f dist
$ git commit -m "init"
```

Finally, deploy to your heroku instance:
``` sh
$ git push heroku master
```

See your running app at `https://<application-name>.heroku.com`,
in the given example it would be: `https://conn-car-tcm-hdang.herokuapp.com/`, or simply open it by running:
``` sh
$ heroku open
```

!!! NOTE: the `server.js` file located in the project's root folder is only for heroku, don't run it locally!

### Test users:
You can use the test user: `test@conn-car-tcm-hdang.herokuapp.com` and password `123412rtt1@#`.

## Github
https://github.com/sea2709/Connected-Car