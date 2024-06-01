import {Component, OnInit } from '@angular/core';
import { JSelectComponent } from "j-lib";
import {FormBuilder, Validators} from "@angular/forms";
import { JButtonComponent } from "jrm-lib";

@Component({
  selector: 'app-example-select',
  standalone: true,
  imports: [
    JSelectComponent,
    JButtonComponent,
  ],
  templateUrl: './example-select.component.html',
  styleUrl: './example-select.component.scss'
})
export class ExampleSelectComponent implements OnInit {
  readonly OPTIONS = [
    { value: true, label: 'Yes sdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf', default: true, disabled: false },
    { value: false, label: 'No', disabled: false }
  ];

  formGroup = this.formBuilder.group({
    name: [true, [Validators.required]],
  })
  constructor(private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    }
  handleClickTeste() {
    console.log(this.formGroup.getRawValue());
  }

}
