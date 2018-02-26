import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../models/user.model';

@Component({
    selector: 'app-logged-in-user',
    templateUrl: './logged-in-user.component.html',
    styleUrls: ['./logged-in-user.component.scss'],
})

export class LoggedInUserComponent implements OnInit {
    public loggedInUser: User;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            // stimulate a demo user
            this.authService.getLoggedInUser().then((user: any) => {
                this.loggedInUser = user;
            });
        }
    }

    logout(): void {
        this.authService.logout();
    }
}