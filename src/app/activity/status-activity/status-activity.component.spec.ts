import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WorkflowService } from '../../services/workflow.service';
import { StatusActivityComponent } from './status-activity.component';

describe('StatusActivityComponent', () => {
    let component: StatusActivityComponent;
    let fixture: ComponentFixture<StatusActivityComponent>;

    class MockWorkflowService {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusActivityComponent],
            imports: [
                FontAwesomeModule
            ],
            providers: [
                { provide: WorkflowService, useClass: MockWorkflowService },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusActivityComponent);
        component = fixture.componentInstance;
        component.activity = {
            activityId: 'a0000000-0000-0000-0000-000000000001',
            activityType: 'StatusActivity',
            status: 'IN_PROGRESS',
            activities: [
                {name: 'Actvity 1', status: 'DONE'},
                {name: 'Actvity 2', status: 'IN_PROGRESS'}
            ]
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        const rows = fixture.nativeElement.querySelectorAll('tr');
        expect(rows.length).toEqual(2);
        let tds = rows[0].querySelectorAll('td');
        expect(tds.length).toEqual(2);
        expect(tds[0].querySelector('.fa-check-square')).toBeTruthy();
        expect(tds[1].textContent).toEqual('Actvity 1');
        tds = rows[1].querySelectorAll('td');
        expect(tds.length).toEqual(2);
        expect(tds[0].querySelector('.fa-square')).toBeTruthy();
        expect(tds[1].textContent).toEqual('Actvity 2');
        expect(fixture.nativeElement.querySelectorAll('.btn').length).toEqual(1);
    });
});
