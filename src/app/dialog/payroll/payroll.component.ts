import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  amount: FormControl;
  payrollForm: FormGroup;
  constructor(private matDialog: MatDialogRef<PayrollComponent>) {
    this.amount = new FormControl('',[Validators.required]);
    this.payrollForm = new FormGroup({
      amount:this.amount,
    });
  }
  checkAndReplaceInput(event: KeyboardEvent): boolean {
    const charCode = Number.parseInt(event.key, 10);
    if (isNaN(charCode)) {
      return false;
    }
    return true;
  }
  onSubmit(): void{
    const date = new Date();
    const payLoad = {
      type: 'debit',
      date: date.toISOString().substr(0,10),
      amount: this.payrollForm.value.amount,
      description: ''
    };
    this.matDialog.close(payLoad);
  }
  ngOnInit(): void {
  }
}
