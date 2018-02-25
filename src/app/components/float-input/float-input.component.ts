import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-float-input',
  templateUrl: './float-input.component.html',
  styleUrls: ['./float-input.component.scss']
})
export class FloatInputComponent {
  @Input() type;
  @Input() name;
  @Input() placeholder;
  @Input() required;
  @Input() readonly;
  @Input() pattern;

  @Input() ngModel;
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter;

  // prop to keep track of password input's reveal
  public reveal = false;

  /**
   * checkInput Check numeric inputs to make sure content has only digits
   * @param {any} $event
   */
  checkInput($event) {
    if ($event.charCode === 13) {
      return;
    }

    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode($event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      $event.preventDefault();
    }
  }
}
