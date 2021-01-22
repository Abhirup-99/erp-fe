import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee-data',
  templateUrl: './edit-employee-data.component.html',
  styleUrls: ['./edit-employee-data.component.scss']
})
export class EditEmployeeDataComponent implements OnInit {
  createForm: FormGroup;
  role: FormControl;
  teamName: FormControl;
  isManager: FormControl;
  salary: FormControl;
  constructor(private matDialog: MatDialogRef<EditEmployeeDataComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.role = new FormControl(this.data.role,Validators.required);
    this.teamName = new FormControl(this.data.teamId,Validators.required);
    const managerData = this.data.isManager ? 'yes' : 'no';
    this.isManager = new FormControl(managerData,Validators.required);
    this.salary = new FormControl(this.data.salary,Validators.required);
    this.createForm = new FormGroup({});
  }
  onSubmit(): void {
    const payLoad = {
      role: this.createForm.value.role,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      team_id: this.createForm.value.teamName,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      is_manager: this.createForm.value.isManager=== 'yes'? true : false,
      salary: this.createForm.value.salary,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      user_id: this.data.id
    };
    this.matDialog.close(payLoad);
  }
  checkAndReplaceInput(event: KeyboardEvent): boolean {
    const charCode = Number.parseInt(event.key, 10);
    if (isNaN(charCode)) {
      return false;
    }
    return true;
  }
  cancelClose(): void{
    this.matDialog.close({});
  }
  ngOnInit(): void {
    this.createForm = new FormGroup({
      role: this.role,
      teamName: this.teamName,
      isManager: this.isManager,
      salary: this.salary,
    });
  }

}
