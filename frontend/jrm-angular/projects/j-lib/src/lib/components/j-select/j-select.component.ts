import {
  Component,
  Inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule } from "@angular/common";
import {IJSelectOption} from "../../../interfaces/j-interfaces";
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'j-select',
  templateUrl: './j-select.component.html',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
})
export class JSelectComponent implements OnDestroy {
  private readonly _COMPONENT_DESTROY$ = new Subject<void>();

  protected prefixId = 'JSelect';

  @Input() id = '';
  @Input() control!: FormControl;
  @Input() label = `Label`;
  @Input() nullOptionName = '-- Selecione --';
  @Input() nullable = false;
  @Input() class: string = 'form-select w-100';
  @Input() eventEmitter = false;
  @Input() divClass = 'form-floating';
  @Input() invalidClass = 'invalid-feedback';
  @Input() options: IJSelectOption[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
  )
  {}

  ngOnDestroy(): void {
    this._COMPONENT_DESTROY$.next();
    this._COMPONENT_DESTROY$.complete();
  }

  get hasValue() {
    const isNullableWithValue = this.nullable && this.nullOptionName;
    const hasNonNullValue = this.control?.value !== null && this.control?.value !== undefined;
    const hasZeroValue = this.control?.value === 0;

    return isNullableWithValue || hasNonNullValue || hasZeroValue;
  }

  get invalid() {
    return this.control?.invalid && this.control?.dirty;
  }

  get valid() {
    return this.control?.valid && this.control?.dirty;
  }

  get isRequired() {
    if (this.control.validator) {
      const VALIDATOR = this.control.validator({} as AbstractControl);
      if (VALIDATOR && (VALIDATOR['required']))
        return true;
    }

    return false;
  }

}




