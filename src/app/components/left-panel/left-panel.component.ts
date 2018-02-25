import {Component, OnInit} from '@angular/core';
import {SettingService} from '../../services/setting.service';
import {environment} from '../../../environments/environment';

const {app} = environment;

@Component({
    selector: 'app-left-panel',
    templateUrl: './left-panel.component.html',
    styleUrls: ['./left-panel.component.scss']
})

export class LeftPanelComponent implements OnInit {
    public activeClient: any;
    public appName: string;

    constructor(private settingService: SettingService) {
    }

    ngOnInit(): void {
        this.appName = app.name;
        this.activeClient = this.settingService.getActiveClient();
    }
}
