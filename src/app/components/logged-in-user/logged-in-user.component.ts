import {AfterContentChecked, Component} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../models/user.model';

@Component({
    selector: 'app-logged-in-user',
    templateUrl: './logged-in-user.component.html',
    styleUrls: ['./logged-in-user.component.scss'],
})

export class LoggedInUserComponent implements AfterContentChecked {
    public loggedInUser: User;

    constructor(private authService: AuthService) {
    }

    ngAfterContentChecked(): void {
        if (this.authService.isAuthenticated()) {
            // stimulate a demo user
            this.authService.getLoggedInUser().then((user: any) => {
                this.loggedInUser = user;
            });
        } else {
            this.loggedInUser = null;
        }
    }

    logout(): void {
        this.authService.logout();
        this.loggedInUser = null;
    }
}