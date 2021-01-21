import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  name: FormControl;
  dob: FormControl;
  phone: FormControl;
  personalEmail: FormControl;
  createForm: FormGroup;
  constructor(private matDialog: MatDialogRef<ProfileEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = new FormControl(this.data.name, [Validators.required]);
    this.dob = new FormControl(this.data.dob, Validators.required);
    this.phone = new FormControl(this.data.phone,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
    this.personalEmail = new FormControl(this.data.personal_email, [Validators.required, Validators.email]);
    this.createForm = new FormGroup({});
  }
  onSubmit(): void {
    const payLoad = {
      name: this.createForm.value.name,
      dob: this.createForm.value.dob,
      phone: this.createForm.value.phone,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      personal_email: this.createForm.value.personalEmail
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
      name: this.name,
      dob: this.dob,
      phone: this.phone,
      personalEmail: this.personalEmail,
    });
  }

}
