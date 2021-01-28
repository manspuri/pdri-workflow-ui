import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wf-scheduling-activity',
  templateUrl: './scheduling-activity.component.html',
  styleUrls: ['./scheduling-activity.component.scss']
})
export class SchedulingActivityComponent implements OnInit {

  constructor() { }

  // @TODO
  // Style two sections one section for your current exams (already divided them up but need to be styled for mobile)
  // property on sheduling activity to show other appointments not related to workflow instance
  // style the columns to make sure it is functional on mobile

  ngOnInit() {
    this.formatData();
    this.dateFmt = 'fullDate';
    this.timeFmt = 'shortTime';
  }

  formatData() {
    this.activity.candidateAppointments.forEach((appointment) => {
      const start = new Date(appointment.appointmentStartTimestamp * 1000)
      const end = new Date(appointment.appointmentEndTimestamp * 1000)
      appointment.start = start
      appointment.end = end
    })
    if (this.activity.workflowInstanceAppointment) {
      const appointment = this.activity.workflowInstanceAppointment
      this.activity.workflowInstanceAppointment.start = new Date(appointment.appointmentStartTimestamp * 1000)
      this.activity.workflowInstanceAppointment.end = new Date(appointment.appointmentEndTimestamp * 1000)
    }
    this.activity.workflowInstanceAppointment = [];
  }

  onExamSchedule() {
    console.log('sheduling exam');
  }

  onExamReschedule() {
    console.log('resheduling exam');
  }

  onExamCancel() {
    console.log('canceling exam');
  }

}
