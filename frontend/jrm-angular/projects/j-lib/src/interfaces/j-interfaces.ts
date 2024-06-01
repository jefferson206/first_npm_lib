import { EDateType } from "../enums/j-enums";

export interface IJSelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  default?: boolean;
  dateType?: EDateType;
}
