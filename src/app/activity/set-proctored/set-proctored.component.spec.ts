import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProctoredComponent } from './set-proctored.component';

describe('SetProctoredComponent', () => {
  let component: SetProctoredComponent;
  let fixture: ComponentFixture<SetProctoredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetProctoredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProctoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
