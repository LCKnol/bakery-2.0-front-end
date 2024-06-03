import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoomComponent } from './assign-room.component';

describe('AddRoomComponent', () => {
  let component: AssignRoomComponent;
  let fixture: ComponentFixture<AssignRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
