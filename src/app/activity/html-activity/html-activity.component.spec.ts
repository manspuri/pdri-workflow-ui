import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowService } from '../../services/workflow.service';
import { HtmlActivityComponent } from './html-activity.component';

describe('HtmlActivityComponent', () => {
    let component: HtmlActivityComponent;
    let fixture: ComponentFixture<HtmlActivityComponent>;

    class MockWorkflowService {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HtmlActivityComponent],
            providers: [
                { provide: WorkflowService, useClass: MockWorkflowService },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HtmlActivityComponent);
        component = fixture.componentInstance;
        component.activity = {
            activityId: 'a0000000-0000-0000-0000-000000000001',
            activityType: 'HtmlActivity',
            status: 'IN_PROGRESS',
            workflow: { name: 'Test Workflow'},
            candidate: { firstName: 'Elroy', lastName: 'Jetson'},
            pages: ['<h1>${w.name}</h1><span>${c.firstName}</span><span>${c.lastName}</span>'],
            pageVars: null,
            allowBack: true,
            currentPage: 0
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        const h1s = fixture.nativeElement.querySelectorAll('h1');
        expect(h1s.length).toEqual(1);
        expect(h1s[0].textContent).toEqual('Test Workflow');
        const spans = fixture.nativeElement.querySelectorAll('span');
        expect(spans.length).toEqual(2);
        expect(spans[0].textContent).toEqual('Elroy');
        expect(spans[1].textContent).toEqual('Jetson');
        expect(fixture.nativeElement.querySelectorAll('.btn').length).toEqual(1);
    });
});
