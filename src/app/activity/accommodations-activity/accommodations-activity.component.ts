import { Component, OnInit } from '@angular/core';

import { BaseActivityComponent } from '../base-activity/base-activity.component';
import { WorkflowService } from '../../services/workflow.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: '[wf-accommodations-activity]',
    templateUrl: './accommodations-activity.component.html',
    styleUrls: ['./accommodations-activity.component.scss']
})
export class AccommodationsActivityComponent extends BaseActivityComponent implements OnInit {

    public instructions: SafeHtml = null;
    public approvalMsg: SafeHtml = null;
    public selectedAccommodations: any = {};
    public otherAccommodations = '';
    public otherAccommodationsStatus = null;
    updating = false;

    constructor(private workflowService: WorkflowService, private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        this.display();
    }

    display() {
        this.selectedAccommodations = {};
        if (this.activity.state === 'SELECTING') {
            this.approvalMsg = null;
            if (this.activity.instructions) {
                this.instructions = this.sanitizer.bypassSecurityTrustHtml(this.activity.instructions);
            }
            for (const accommodation of this.activity.accommodations) {
                accommodation.selected = false;
                accommodation.status = '';
            }
        } else {
            this.instructions = null;
            if (this.activity.approvalMsg) {
                this.approvalMsg = this.sanitizer.bypassSecurityTrustHtml(this.activity.approvalMsg);
            }
            for (const accommodation of this.activity.accommodations) {
                accommodation.selected = this.activity.selectedAccommodations[accommodation.code];
                accommodation.status = this.activity.selectedAccommodations[accommodation.code]
                    ? this.activity.approvalStatuses[this.activity.selectedAccommodations[accommodation.code]] : '';
            }
            if (this.activity.otherAccommodations) {
                this.otherAccommodations = this.activity.otherAccommodations;
                this.otherAccommodationsStatus = this.activity.approvalStatuses[this.activity.selectedAccommodations.__OTHER__];
            }
        }
        window.scroll(0, 0);
    }

    next() {
        const data: any = {};
        if (this.activity.state === 'SELECTING') {
            data.selectedAccommodations = {};
            for (const accommodation of this.activity.accommodations) {
                if (accommodation.selected) {
                    data.selectedAccommodations[accommodation.code] = true;
                }
            }
            if (this.activity.allowOther && this.otherAccommodations.trim()) {
                data.otherAccommodations = this.otherAccommodations.trim();
            }
        } else if (this.activity.state === 'REVIEWED') {
            data.acknowledged = true;
        }
        this.updating = true;
        this.errors.emit(BaseActivityComponent.NO_ERRORS);
        this.workflowService.updateActivity(this.activity.activityId, data).subscribe(
            (resp: any) => {
                this.activity = resp;
                if (this.activity.status === 'DONE') {
                    this.done.emit(true);
                    return;
                }
                this.updating = false;
                this.display();
            },
            (error: string) => {
                this.errors.emit([error]);
                window.scroll(0, 0);
                this.updating = false;
            }
        );
    }

}
