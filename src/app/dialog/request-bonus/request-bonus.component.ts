import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-bonus',
  templateUrl: './request-bonus.component.html',
  styleUrls: ['./request-bonus.component.scss']
})
export class RequestBonusComponent implements OnInit {
  amount: FormControl;
  bonusForm: FormGroup;
  constructor(private matDialog: MatDialogRef<RequestBonusComponent>) {
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
  onSubmit(): void{
    const date = new Date();
    const payLoad = {
      type: 'bonus',
      description: '',
      created: date.toISOString().substr(0,10),
      amount: this.bonusForm.value.amount
    };
    this.matDialog.close(payLoad);
  }
  ngOnInit(): void {
  }

}
