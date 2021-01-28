import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule, PF_AUTH_CONFIG } from '@pfit2ng/common';

import { AuthGuardGuard } from './auth-guard.guard';

describe('AuthGuardGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                CommonModule,
            ],
            providers: [
                { provide: PF_AUTH_CONFIG, useValue: { jwtName: 'WF_AUTH' } }
            ]
        });
    });

    it('should ...', inject([AuthGuardGuard], (guard: AuthGuardGuard) => {
        expect(guard).toBeTruthy();
    }));
});
