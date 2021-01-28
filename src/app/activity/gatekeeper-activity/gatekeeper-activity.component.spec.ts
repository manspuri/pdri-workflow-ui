import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowService } from '../../services/workflow.service';
import { GatekeeperActivityComponent } from './gatekeeper-activity.component';

describe('GatekeeperActivityComponent', () => {
    let component: GatekeeperActivityComponent;
    let fixture: ComponentFixture<GatekeeperActivityComponent>;

    class MockWorkflowService {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GatekeeperActivityComponent],
            providers: [
                { provide: WorkflowService, useClass: MockWorkflowService },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GatekeeperActivityComponent);
        component = fixture.componentInstance;
        component.activity = {
            activityId: 'a0000000-0000-0000-0000-000000000001',
            activityType: 'GatekeeperActivity',
            status: 'IN_PROGRESS'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(fixture.nativeElement.querySelectorAll('.btn').length).toEqual(1);
    });
});
