import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingActivityComponent } from './scheduling-activity.component';

describe('SchedulingActivityComponent', () => {
  let component: SchedulingActivityComponent;
  let fixture: ComponentFixture<SchedulingActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
