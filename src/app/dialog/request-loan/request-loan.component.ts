import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-loan',
  templateUrl: './request-loan.component.html',
  styleUrls: ['./request-loan.component.scss']
})
export class RequestLoanComponent implements OnInit {
  amount: FormControl;
  reason: FormControl;
  loanForm: FormGroup;
  constructor() {
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
  onSubmit(): void{}
  ngOnInit(): void {
  }

}
