import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
@Component({
  selector: 'j-button',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './j-button.component.html'
})
export class JButtonComponent {
  protected prefixId = 'JButton';
  @Input() id = '';
  @Input() disable = false;
  @Input() extraClasses = 'btn-primary';
  @Input() class = 'btn w-100';
  @Output() buttonClick = new EventEmitter();

  handleButtonClick(event: any) {
    if (!this.disable) this.buttonClick.emit(event);
  }
}
