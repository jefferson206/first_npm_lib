import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleSelectComponent } from './example-select.component';

describe('ExampleSelectComponent', () => {
  let component: ExampleSelectComponent;
  let fixture: ComponentFixture<ExampleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExampleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
