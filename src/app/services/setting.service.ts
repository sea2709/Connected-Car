import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

const {app} = environment;

@Injectable()
export class SettingService {
    /**
     * get the active client which is configured in the environment setting file
     * @returns {JSON object}
     */
    public getActiveClient(): any {
        let activeClient;
        for (const key of Object.keys(app.clients)) {
            if (app.clients[key].active === 1) {
                activeClient = app.clients[key];
                break;
            }
        }

        return activeClient;
    }
}
