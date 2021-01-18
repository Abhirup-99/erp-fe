import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBonusComponent } from './request-bonus.component';

describe('RequestBonusComponent', () => {
  let component: RequestBonusComponent;
  let fixture: ComponentFixture<RequestBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestBonusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
