import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdashboardsComponent } from './viewdashboards.component';

describe('ViewdashboardsComponent', () => {
  let component: ViewdashboardsComponent;
  let fixture: ComponentFixture<ViewdashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewdashboardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewdashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
