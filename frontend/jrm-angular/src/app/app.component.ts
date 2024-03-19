import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JButtonComponent } from "jrm-lib";
// import { JButtonComponent } from "j-lib";
import { JInputComponent } from "jrm-lib";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    JButtonComponent,
    JInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    nameMaxFiveLength: ['', [Validators.maxLength(5), Validators.required]]
  })
  customPatterns = { '0': { pattern: new RegExp('\[a-zA-Z\]')} };
  constructor(private formBuilder: FormBuilder) {
  }

  handleClickTeste(event: any) {
    this.formGroup.controls.name.setErrors({'incorrect': true});
    console.log('console', this.formGroup.value);
  }

  handleDisableName() {
    this.formGroup.controls.name.disable();
  }
}
