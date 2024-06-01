import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleInputComponent } from './example-input.component';

describe('ExampleInputComponent', () => {
  let component: ExampleInputComponent;
  let fixture: ComponentFixture<ExampleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExampleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
