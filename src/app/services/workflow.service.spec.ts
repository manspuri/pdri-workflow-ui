import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, PF_AUTH_CONFIG } from '@pfit2ng/common';

import { WorkflowService } from './workflow.service';

describe('WorkflowService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                CommonModule
            ],
            providers: [
                { provide: PF_AUTH_CONFIG, useValue: { jwtName: 'WF_AUTH' } },
                WorkflowService
            ]
        });
    });

    it('should be created', inject([WorkflowService], (service: WorkflowService) => {
        expect(service).toBeTruthy();
    }));
});
