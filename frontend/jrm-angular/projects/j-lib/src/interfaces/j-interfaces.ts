import { EDateType } from "../enums/j-enums";

export interface IJSelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  default?: boolean;
  dateType?: EDateType;
}

export interface JRadioOption {
  value: number | string;
  label: string;
  disabled: boolean;
}
