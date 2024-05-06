import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpiComponent } from './editpi.component';

describe('EditpiComponent', () => {
  let component: EditpiComponent;
  let fixture: ComponentFixture<EditpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
