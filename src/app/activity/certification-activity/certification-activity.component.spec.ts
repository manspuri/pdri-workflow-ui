import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationActivityComponent } from './certification-activity.component';

describe('CertificationActivityComponent', () => {
  let component: CertificationActivityComponent;
  let fixture: ComponentFixture<CertificationActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
