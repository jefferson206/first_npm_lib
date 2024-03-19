import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from "@angular/common";
import { AbstractControl, FormControl, ReactiveFormsModule } from "@angular/forms";
import { tap } from "rxjs/operators";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
@Component({
  selector: 'j-input',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe ],
  templateUrl: './j-input.component.html',
  providers: [ provideNgxMask() ],
})
export class JInputComponent implements OnInit {
  protected prefixId = 'JInput';
  protected defaultClass = 'form-control w-100';
  protected JInputType = 'text'
  protected required = false;

  @Input() id = '';
  @Input() acceptOnlyLetters = false;
  @Input() notAcceptSpecialCharacters = false;
  @Input() control!: FormControl;
  @Input() floatLabel = true;
  @Input() extraClasses = '';
  @Input() label= `Label`;
  @Input() placeholder = '';
  @Input() maxLength = 250;
  @Input() style = {};
  @Input() mask = '';
  @Input() prefixMask = '';
  @Input() allowNegativeNumbersMask = false;
  @Input() suffixMask = '';
  @Input() showMaskBeforeType = false;
  @Input() maskDropSpecialCharacters = true;

  ngOnInit(): void {
    this._handleControlChange()
    this._checkIfControlIsRequired();
  }

  private _handleControlChange() {
    if (this.control) {
      this.control.valueChanges.pipe(
        tap((changedValue: string) => {
          this._handleOnlyLetters(changedValue)
          this._handleNotAcceptSpecialCharacters(changedValue);
        })
      ).subscribe();
    }
  }

  private _handleOnlyLetters(changedValue: string) {
    if (this.acceptOnlyLetters) {
      const VALUE_TO_UPDATE = changedValue.replace(/[^a-zA-Z]/g, '');
      this.control.setValue(VALUE_TO_UPDATE, { emitEvent: false });
    }
  }

  private _handleNotAcceptSpecialCharacters(changedValue: string) {
    if (this.notAcceptSpecialCharacters) {
      const VALUE_TO_UPDATE = changedValue.replace(/[^a-z0-9]/g, '');
      this.control.setValue(VALUE_TO_UPDATE, { emitEvent: false });
    }
  }

  private _checkIfControlIsRequired() {
    if (this.control.validator) {
      const VALIDATOR = this.control.validator({} as AbstractControl);
      return this.required = (Boolean(VALIDATOR));
    }
    return this.required = false;
  }

}
