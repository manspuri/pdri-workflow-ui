import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsActivityComponent } from './accommodations-activity.component';

describe('AccommodationsActivityComponent', () => {
  let component: AccommodationsActivityComponent;
  let fixture: ComponentFixture<AccommodationsActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationsActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
