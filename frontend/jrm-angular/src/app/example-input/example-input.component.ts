import { Component } from '@angular/core';
import { JButtonComponent } from "j-lib";
import { JInputComponent } from "j-lib";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
// import { JButtonComponent } from "jrm-lib"; // Import from npm
// import { JInputComponent } from "jrm-lib"; // Import from npm
@Component({
  selector: 'app-example-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JButtonComponent,
    JInputComponent,
  ],
  templateUrl: './example-input.component.html',
  styleUrl: './example-input.component.scss'
})
export class ExampleInputComponent {
  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    nameMaxFiveLength: ['', [Validators.maxLength(5), Validators.required]]
  })

  constructor(private formBuilder: FormBuilder) {
  }

  readonly customPatterns = { '0': { pattern: new RegExp('\[a-zA-Z\]')} };

  handleClickTeste() {
    this.formGroup.controls.name.setErrors({'incorrect': true});
  }

  handleDisableName() {
    this.formGroup.controls.name.disable();
  }
}
