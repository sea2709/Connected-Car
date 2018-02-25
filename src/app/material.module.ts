import {MatButtonModule, MatCheckboxModule, MatProgressBarModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatProgressBarModule],
    exports: [MatButtonModule, MatCheckboxModule, MatProgressBarModule],
})

export class MaterialModule {
}
