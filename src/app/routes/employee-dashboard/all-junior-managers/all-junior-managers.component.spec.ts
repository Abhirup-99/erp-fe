import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJuniorManagersComponent } from './all-junior-managers.component';

describe('AllJuniorManagersComponent', () => {
  let component: AllJuniorManagersComponent;
  let fixture: ComponentFixture<AllJuniorManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllJuniorManagersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllJuniorManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
