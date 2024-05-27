import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeamFromRoomComponent } from './delete-team-from-room.component';

describe('DeleteTeamFromRoomComponent', () => {
  let component: DeleteTeamFromRoomComponent;
  let fixture: ComponentFixture<DeleteTeamFromRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTeamFromRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteTeamFromRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
