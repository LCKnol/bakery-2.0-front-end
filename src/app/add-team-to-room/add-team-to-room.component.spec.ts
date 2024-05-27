import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamToRoomComponent } from './add-team-to-room.component';

describe('AddTeamToRoomComponent', () => {
  let component: AddTeamToRoomComponent;
  let fixture: ComponentFixture<AddTeamToRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeamToRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTeamToRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
