import {ChangeDetectorRef, Component, ElementRef, HostBinding, Input, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {noop, Subject, takeUntil} from "rxjs";
import {JRadioOption} from "../../../interfaces/j-interfaces";

@Component({
  selector: 'j-radio',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './j-radio.component.html',
  styleUrl: './j-radio.component.scss'
})
export class JRadioComponent {
  protected prefixId = 'JRadio';

  @Input() id = '';
  @Input() control!: FormControl;

  @Input() isRadioReverse = false; // trocar o nome da propriedade para uma mais condizente .... label in front
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

  private _radioGroup!: HTMLInputElement[];
  private _radioFieldGroup!: HTMLInputElement[];
  private _prevIndex!: any;

  private readonly _COMPONENT_DESTROY$ = new Subject<void>();

  constructor(private _cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this._radioGroup = this.radio.map((el) => el.nativeElement);
    this._radioFieldGroup = this.radioField.map((el) => el.nativeElement);

    if (this.flex)
      this._radioFieldGroup.forEach((el) => (el.style.paddingRight = '15px'));

    if (this.control) {
      const DEF_IDX = this._getOptionIndexById(this.control.value);
      this.handleClick(DEF_IDX, this.control.value);

      this.control.valueChanges
        .pipe(takeUntil(this._COMPONENT_DESTROY$))
        .subscribe((value) => {
          const IDX = this._getOptionIndexById(value);
          this.handleClick(IDX, value, false);
        });

      this.control.statusChanges
        .pipe(takeUntil(this._COMPONENT_DESTROY$))
        .subscribe((status: any) => {
          this._statusChange(status);
        });
      return;
    }

    this.control = new FormControl(1);
    const DEF_IDX = this._getOptionIndexById(1);
    this.handleClick(DEF_IDX, 1);
  }

  ngOnDestroy(): void {
    this._COMPONENT_DESTROY$.next();
    this._COMPONENT_DESTROY$.complete();
  }

  private _statusChange(status: any) {
    if (status === 'VALID' || status === 'INVALID' ) {
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
    this.control.disabled ? this._statusChange('DISABLED') : noop();
    this._cdr.markForCheck();
  }

  trackByFn(index: number, el: JRadioOption) {
    return el.value;
  }

  private _getOptionIndexById(value: number): number {
    return value
      ? this.options.findIndex((option) => option.value === value)
      : 0;
  }

  private _createGridTemplateColumns(columns: number): string {
    if (columns < 0) return '1fr';

    let templateColumns = '';
    for (let i = 0; i < columns; i++) templateColumns += '1fr ';
    return templateColumns;
  }


  private _addDisabled() {
    this._radioFieldGroup.forEach((radioField) => {
      if (radioField.classList.contains('disabled')) return;

      radioField.classList.add('disabled');
      return;
    });
  }

  private _removeDisabled() {
    this._radioFieldGroup.forEach((radioField) => {
      if (!radioField.classList.contains('disabled')) return;

      radioField.classList.remove('disabled');
      return;
    });
  }
}


