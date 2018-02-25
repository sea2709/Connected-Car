import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';

// app routings
import {AppRoutingModule} from './app-routing.module';

// auth services
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';

// main app component
import {AppComponent} from './app.component';

// app page components
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {CustomerLookupPageComponent} from './pages/customer-lookup-page/customer-lookup-page.component';

// app components
import {FloatInputComponent} from './components/float-input/float-input.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PinInputComponent} from './components/pin-input/pin-input.component';
import {CustomerLookupComponent} from './components/customer-lookup/customer-lookup.component';
import {CustomerSelectCarrierComponent} from './components/customer-select-carrier/customer-select-carrier.component';
import {CustomerInfoComponent} from './components/customer-info/customer-info.component';
import {CustomerPinComponent} from './components/customer-pin/customer-pin.component';
import {CustomerActivatedComponent} from './components/customer-activated/customer-activated.component';
import {LeftPanelComponent} from './components/left-panel/left-panel.component';

// api service
import {ApiService} from './services/api.service';
import {CustomerComponent} from './components/customer/customer.component';
import {LoggedInUserComponent} from './components/logged-in-user/logged-in-user.component';
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        CustomerLookupPageComponent,
        LoggedInUserComponent,
        FloatInputComponent,
        LoaderComponent,
        PinInputComponent,
        CustomerComponent,
        ProgressBarComponent,
        CustomerSelectCarrierComponent,
        CustomerLookupComponent,
        CustomerInfoComponent,
        CustomerPinComponent,
        CustomerActivatedComponent,
        LeftPanelComponent
    ],
    imports: [
        FormsModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        MaterialModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
