import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveManageTableComponent } from './leave-manage-table.component';

describe('LeaveManageTableComponent', () => {
  let component: LeaveManageTableComponent;
  let fixture: ComponentFixture<LeaveManageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveManageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveManageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
