import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestBonusComponent } from '../request-bonus/request-bonus.component';

@Component({
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.scss']
})
export class UpdateManagerComponent implements OnInit {
  manager: FormControl;
  updateForm: FormGroup;
  constructor(private matDialog: MatDialogRef<RequestBonusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.manager = new FormControl('',[Validators.required]);
    this.updateForm = new FormGroup({
      manager:this.manager,
    });
  }
  onSubmit(): void{
    const payLoad = {
      manager: this.updateForm.value.manager,
    };
    console.log('closed',payLoad);
    this.matDialog.close(payLoad);
  }
  ngOnInit(): void {
    console.log(this.data);
  }

}
