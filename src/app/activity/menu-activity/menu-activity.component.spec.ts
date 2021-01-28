import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuActivityComponent } from './menu-activity.component';

describe('MenuActivityComponent', () => {
  let component: MenuActivityComponent;
  let fixture: ComponentFixture<MenuActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
