import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
@Component({
  selector: 'j-button',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './j-button.component.html',
  styleUrl: './j-button.component.css'
})
export class JButtonComponent {
  protected prefixId = 'JButton';
  protected defaultClass = 'btn w-100';
  @Input() id = '';
  @Input() disable = false;
  @Input() extraClasses = 'btn-primary';
  @Output() buttonClick = new EventEmitter();

  handleButtonClick(event: any) {
    if (!this.disable) this.buttonClick.emit(event);
  }
}
