import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';

import { WorkflowService } from '../../services/workflow.service';
import { ActivityDirective } from '../activity.directive';
import { ActivityViewComponent } from './activity-view.component';
import { GatekeeperActivityComponent } from '../gatekeeper-activity/gatekeeper-activity.component';

describe('ActivityViewComponent', () => {
    let component: ActivityViewComponent;
    let fixture: ComponentFixture<ActivityViewComponent>;

    class MockWorkflowService {
        getActivity() {
            return of({
                activityId: 'a0000000-0000-0000-0000-000000000001',
                activityType: 'GateKeeperActivity',
                status: 'IN_PROGRESS'
            });
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ActivityDirective,
                ActivityViewComponent,
                GatekeeperActivityComponent
            ],
            providers: [
                { provide: WorkflowService, useClass: MockWorkflowService },
            ]
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: {
                    entryComponents: [GatekeeperActivityComponent]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons.length).toEqual(1);
        expect(buttons[0].textContent).toEqual('Proceed');
    });
});
