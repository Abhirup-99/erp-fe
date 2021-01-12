import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  name: FormControl;
  Dob: FormControl;
  phone: FormControl;
  personalEmail: FormControl;
  createForm: FormGroup;
  constructor() {
    this.name = new FormControl('', [Validators.required]);
    this.Dob = new FormControl('', Validators.required);
    this.phone = new FormControl('',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
    this.personalEmail = new FormControl('', [Validators.required, Validators.email]);
    this.createForm = new FormGroup({});
  }
  onSubmit(): void { }
  checkAndReplaceInput(event: KeyboardEvent): boolean {
    const charCode = Number.parseInt(event.key, 10);
    if (isNaN(charCode)) {
      return false;
    }
    return true;
  }
  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: this.name,
      dob: this.Dob,
      phone: this.phone,
      personalEmail: this.personalEmail,
    });
  }

}
