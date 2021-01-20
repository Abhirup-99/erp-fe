import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanManageTableComponent } from './loan-manage-table.component';

describe('LoanManageTableComponent', () => {
  let component: LoanManageTableComponent;
  let fixture: ComponentFixture<LoanManageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanManageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanManageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
