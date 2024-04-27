import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PimanagerComponent } from './pimanager.component';

describe('PimanagerComponent', () => {
  let component: PimanagerComponent;
  let fixture: ComponentFixture<PimanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PimanagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PimanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
