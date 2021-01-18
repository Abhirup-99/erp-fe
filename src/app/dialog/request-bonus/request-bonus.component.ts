import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-bonus',
  templateUrl: './request-bonus.component.html',
  styleUrls: ['./request-bonus.component.scss']
})
export class RequestBonusComponent implements OnInit {
  amount: FormControl;
  bonusForm: FormGroup;
  constructor() {
    this.amount = new FormControl('',[Validators.required]);
    this.bonusForm = new FormGroup({
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
  onSubmit(): void{}
  ngOnInit(): void {
  }

}
