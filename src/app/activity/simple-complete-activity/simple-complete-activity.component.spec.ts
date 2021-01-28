import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, PF_AUTH_CONFIG } from '@pfit2ng/common';

import { WorkflowService } from '../../services/workflow.service';
import { SimpleCompleteActivityComponent } from './simple-complete-activity.component';

describe('SimpleCompleteActivityComponent', () => {
    let component: SimpleCompleteActivityComponent;
    let fixture: ComponentFixture<SimpleCompleteActivityComponent>;

    class MockWorkflowService {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleCompleteActivityComponent],
            imports: [
                CommonModule
            ],
            providers: [
                { provide: PF_AUTH_CONFIG, useValue: { jwtName: 'WF_AUTH' } },
                { provide: WorkflowService, useClass: MockWorkflowService },
            ]
        }).compileComponents();
    }));

    const createTestComponent = (activity: any) => {
        fixture = TestBed.createComponent(SimpleCompleteActivityComponent);
        component = fixture.componentInstance;
        component.activity = activity;
        fixture.detectChanges();
    };

    it('should create with standard message', () => {
        createTestComponent({
            activityId: 'a0000000-0000-0000-0000-000000000001',
            activityType: 'GatekeeperActivity',
            status: 'IN_PROGRESS',
            workflow: { name: 'Test Workflow' },
            candidate: null,
            message: null,
            messageVars: null
        });
        expect(component).toBeTruthy();
        expect(fixture.nativeElement.querySelector('span').textContent)
            .toEqual('You have finished all of the activities for this workflow.');
    });

    it('should create with custom message', () => {
        createTestComponent({
            activityId: 'a0000000-0000-0000-0000-000000000001',
            activityType: 'GatekeeperActivity',
            status: 'IN_PROGRESS',
            workflow: { name: 'Test Workflow' },
            candidate: { firstName: 'Elroy', lastName: 'Jetson' },
            message: '<span>Goodbye ${c.firstName}</span>',
            messageVars: null
        });
        expect(component).toBeTruthy();
        expect(fixture.nativeElement.querySelector('span').textContent)
            .toEqual('Goodbye Elroy');
    });
});

