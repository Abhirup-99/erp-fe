import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBonusTableComponent } from './request-bonus-table.component';

describe('RequestBonusTableComponent', () => {
  let component: RequestBonusTableComponent;
  let fixture: ComponentFixture<RequestBonusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestBonusTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestBonusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
