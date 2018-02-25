import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
    @Input() seconds: number;
    @Output() finished: EventEmitter<any> = new EventEmitter;

    remainingSeconds: number;
    started = false;
    countDown: any;
    expired = false;

    private _countDownSub: any;

    public reset(): void {
        this.remainingSeconds = this.seconds + 1;
        this.started = true;
        this.expired = false;
        this.countDown = Observable.timer(0, 1000).take(this.remainingSeconds);
    }

    public start(): void {
        this._countDownSub = this.countDown.subscribe({
            next: () => {
                --this.remainingSeconds;
            },
            complete: () => {
                this.finished.emit();
                this.expired = true;
                this._countDownSub.unsubscribe();
            }
        });
    }
}
