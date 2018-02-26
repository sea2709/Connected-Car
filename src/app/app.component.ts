import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {SettingService} from './services/setting.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(public settingService: SettingService, @Inject(DOCUMENT) private document: Document) {
    }

    ngOnInit(): void {
        // add active theme class to the body tag
        const activeClient = this.settingService.getActiveClient();
        this.document.body.classList.add(activeClient.theme);
    }
}
