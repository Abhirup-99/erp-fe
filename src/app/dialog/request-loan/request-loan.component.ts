import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-loan',
  templateUrl: './request-loan.component.html',
  styleUrls: ['./request-loan.component.scss']
})
export class RequestLoanComponent implements OnInit {
  amount: FormControl;
  reason: FormControl;
  loanForm: FormGroup;
  constructor(private matDialog: MatDialogRef<RequestLoanComponent>) {
    this.amount = new FormControl('', Validators.required);
    this.reason = new FormControl('', Validators.required);
    this.loanForm = new FormGroup({
      amount: this.amount,
      reason: this.reason
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
      type: 'loan',
      description: this.loanForm.value.reason,
      created: date.toISOString().substr(0,10),
      amount: this.loanForm.value.amount
    };
    this.matDialog.close(payLoad);
  }
  ngOnInit(): void {
  }

}
