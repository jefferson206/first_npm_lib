import {Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

import { JRadioComponent } from "j-lib";
import { JButtonComponent } from "j-lib";

@Component({
  selector: 'app-example-radio',
  standalone: true,
  imports: [
    JRadioComponent,
    JButtonComponent,
  ],
  templateUrl: './example-radio.component.html',
})
export class ExampleRadioComponent  {
  readonly OPTIONS = [
    { value: 1, label: 'Yes', disabled: false },
    { value: 2, label: 'No', disabled: false }
  ];

  formGroup = this.formBuilder.group({
    name: [1, [Validators.required]],
  })
  constructor(private formBuilder: FormBuilder) {  }

  handleClickTeste() {
    console.log(this.formGroup.getRawValue());
  }

}
