import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators} from '@angular/forms';
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
  constructor() {
    this.startDate = new FormControl('', Validators.required);
    this.endDate = new FormControl('', Validators.required);
    this.reason = new FormControl('', Validators.required);
    this.leaveForm = new FormGroup({
      startDate: this.startDate,
      endDate: this.startDate,
      reason: this.reason
    });
  }
  onSubmit(): void{}
  ngOnInit(): void {
  }

}
