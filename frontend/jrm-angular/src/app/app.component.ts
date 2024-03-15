import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { JInputComponent } from "jrm-lib";
import { JButtonComponent } from "j-lib";
import {JInputComponent} from "j-lib";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    JButtonComponent,
    JInputComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jrm-angular';

  handleClickTeste(event: any) {
    alert(`button clicked ${event}`);
  }
}
