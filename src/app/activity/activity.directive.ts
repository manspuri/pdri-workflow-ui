import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[wf-activity]'
})
export class ActivityDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }

}
