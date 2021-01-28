import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectActivityComponent } from './language-select-activity.component';

describe('LanguageSelectActivityComponent', () => {
    let component: LanguageSelectActivityComponent;
    let fixture: ComponentFixture<LanguageSelectActivityComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LanguageSelectActivityComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LanguageSelectActivityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
