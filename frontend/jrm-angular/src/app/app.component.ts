import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExampleInputComponent} from "./example-input/example-input.component";
import {ExampleNavbarComponent} from "./example-navbar/example-navbar.component";
import {ExampleSelectComponent} from "./example-select/example-select.component";
import {ExampleRadioComponent} from "./example-radio/example-radio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    ExampleInputComponent,
    ExampleNavbarComponent,
    ExampleSelectComponent,
    ExampleRadioComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor() {
  }

}
