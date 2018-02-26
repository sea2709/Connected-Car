import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// auth services
import {AuthGuardService} from './auth/auth-guard.service';

// app page components
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {CustomerLookupPageComponent} from './pages/customer-lookup-page/customer-lookup-page.component';

const routes: Routes = [
    {path: '', redirectTo: '/lookup', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'lookup', component: CustomerLookupPageComponent, canActivate: [AuthGuardService]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
