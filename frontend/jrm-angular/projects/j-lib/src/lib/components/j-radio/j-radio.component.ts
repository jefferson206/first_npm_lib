import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input, OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {noop, Subject, takeUntil} from "rxjs";
import {JRadioOption} from "../../../interfaces/j-interfaces";
import {tap} from "rxjs/operators";

@Component({
  selector: 'j-radio',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './j-radio.component.html',
  styleUrl: './j-radio.component.scss'
})
export class JRadioComponent implements AfterViewInit, OnDestroy {
  private _radioGroup!: HTMLInputElement[];
  private _radioFieldGroup!: HTMLInputElement[];
  private _prevIndex!: any;
  private readonly _COMPONENT_DESTROY$ = new Subject<void>();
  protected prefixId = 'JRadio';
  readonly ONE_FRAME: string = '1fr';

  @Input() id = '';
  @Input() control!: FormControl;
  @Input() labelBehindRadio = false;
  @Input() isLabelTextWrap = false;
  @Input() style = { width: '18px', height: '18px' };
  @Input() columns: number = 2;
  @Input() flex = false;
  @Input() hideWhereDisabled = false;
  @Input() options: JRadioOption[] = [];

  @ViewChildren('jRadioField') radioField!: QueryList<ElementRef>;
  @ViewChildren('jRadio') radio!: QueryList<ElementRef>;

  @HostBinding('style.gridTemplateColumns')
  get gridTemplateColumns() {
    return !this.flex ? this._createGridTemplateColumns(this.columns) : null;
  }

  @HostBinding('style.display')
  get flexBox() {
    return this.flex ? 'flex' : 'grid';
  }

  @HostBinding('style.paddingRight')
  get paddingRight() {
    return this.flex ? '15px' : null;
  }

  private _setPaddingStyleIfIsFlex() {
    if (this.flex) {
      this._radioFieldGroup.forEach((element: HTMLInputElement) => (element.style.paddingRight = '15px'));
    }
  }

  private _handleControlAndStatusChangeIfHasControl() {
    if (this.control) {
      const DEF_IDX = this._getOptionIndexById(this.control.value);
      this.handleClick(DEF_IDX, this.control.value);

      this.control.valueChanges.pipe(
          takeUntil(this._COMPONENT_DESTROY$),
          tap((value) => {
            const IDX: number = this._getOptionIndexById(value);
            this.handleClick(IDX, value, false);
          })
        ).subscribe();

      this.control.statusChanges.pipe(
          takeUntil(this._COMPONENT_DESTROY$),
          tap((status: any) => this._statusChange(status))
        ).subscribe();
      return true;
    }
    return false;
  }

  ngAfterViewInit(): void {
    this._setRadioGroup();
    this._setRadioFieldGroup();
    this._setPaddingStyleIfIsFlex();
    if (this._handleControlAndStatusChangeIfHasControl()) return;
    this.control = new FormControl(1);
    this.handleClick(this._getOptionIndexById(1), 1);
  }

  ngOnDestroy(): void {
    this._COMPONENT_DESTROY$.next();
    this._COMPONENT_DESTROY$.complete();
  }

  private _setRadioGroup() {
    this._radioGroup = this.radio.map((element: ElementRef<any>) => element.nativeElement);
  }

  private _setRadioFieldGroup() {
    this._radioFieldGroup = this.radioField.map((element: ElementRef<any>) => element.nativeElement);
  }

  private _statusChange(status: any) {
    if (status === STATUS.VALID || status === STATUS.INVALID ) {
      this._removeDisabled();
      return;
    }
    this._addDisabled();
  }
  handleClick(index: number, val: number | string, emitEvent = true) {
    this._radioGroup[this._prevIndex]?.classList?.remove('checked');
    this._radioGroup[index]?.classList.add('checked');
    this._prevIndex = index;
    this.control.setValue(val, { emitEvent: emitEvent });
    this.control.disabled ? this._statusChange(STATUS.DISABLED) : noop();
  }

  trackByFn(index: number, el: JRadioOption) {
    return el.value;
  }

  private _getOptionIndexById(value: number): number {
    return value ? this.options.findIndex((option: JRadioOption) => option.value === value) : 0;
  }

  private _createGridTemplateColumns(columns: number): string {
    if (columns < 0) return this.ONE_FRAME;
    let templateColumns = '';
    for (let count: number = 0; count < columns; count++) templateColumns += `${this.ONE_FRAME} `;
    return templateColumns;
  }

  private _addDisabled() {
    this._radioFieldGroup.forEach((radioField: HTMLInputElement) => {
      if (radioField.classList.contains('disabled')) return;
      radioField.classList.add('disabled');
    });
  }

  private _removeDisabled() {
    this._radioFieldGroup.forEach((radioField: HTMLInputElement) => {
      if (!radioField.classList.contains('disabled')) return;
      radioField.classList.remove('disabled');
    });
  }
}

const STATUS = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  DISABLED: 'DISABLED',
}

