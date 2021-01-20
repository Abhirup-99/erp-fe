import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseManageTableComponent } from './raise-manage-table.component';

describe('RaiseManageTableComponent', () => {
  let component: RaiseManageTableComponent;
  let fixture: ComponentFixture<RaiseManageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseManageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseManageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
