import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-leave-create',
  templateUrl: './leave-create.component.html',
  styleUrls: ['./leave-create.component.scss']
})
export class LeaveCreateComponent implements OnInit {
  selected = '';
  startDate: FormControl;
  endDate: FormControl;
  reason: FormControl;
  leaveForm: FormGroup;
  constructor(private matDialog: MatDialogRef<LeaveCreateComponent>) {
    this.startDate = new FormControl('', Validators.required);
    this.endDate = new FormControl('', Validators.required);
    this.reason = new FormControl('', Validators.required);
    this.leaveForm = new FormGroup({
      startDate: this.startDate,
      endDate: this.startDate,
      reason: this.reason
    });
  }
  onSubmit(): void{
    if(this.selected === 'multi'){
      this.endDate = this.startDate;
    }
    const currentDate = new Date();
    const payLoad = {
      leaveStart: this.leaveForm.value.startDate.substring(0,10),
      leaveEnd: this.leaveForm.value.endDate.substring(0,10),
      description: this.leaveForm.value.reason,
      leaveCreated: currentDate.toISOString().substring(0,10)
    };
    this.matDialog.close(payLoad);
  }
  ngOnInit(): void {
  }

}
