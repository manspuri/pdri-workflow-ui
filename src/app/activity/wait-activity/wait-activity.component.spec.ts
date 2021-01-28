import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitActivityComponent } from './wait-activity.component';

describe('WaitActivityComponent', () => {
  let component: WaitActivityComponent;
  let fixture: ComponentFixture<WaitActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
