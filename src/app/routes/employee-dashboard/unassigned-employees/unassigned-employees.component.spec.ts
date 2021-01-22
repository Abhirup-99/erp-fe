import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedEmployeesComponent } from './unassigned-employees.component';

describe('UnassignedEmployeesComponent', () => {
  let component: UnassignedEmployeesComponent;
  let fixture: ComponentFixture<UnassignedEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignedEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
