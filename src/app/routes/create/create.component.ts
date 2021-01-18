import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BeService } from '../../service/be.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  name: FormControl;
  dob: FormControl;
  phone: FormControl;
  personalEmail: FormControl;
  createForm: FormGroup;
  constructor(private beService: BeService) {
    this.name = new FormControl('', [Validators.required]);
    this.dob = new FormControl('', Validators.required);
    this.phone = new FormControl('',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
    this.personalEmail = new FormControl('', [Validators.required, Validators.email]);
    this.createForm = new FormGroup({});
  }
  onSubmit(): void {
    const dateAsString: string = this.createForm.value.dob.toISOString();
    const payload = {...this.createForm.value,dob:dateAsString.substr(0,10)};
    this.beService.submitData(payload).subscribe(res=>{
      console.log(res);
    });
  }

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
      dob: this.dob,
      phone: this.phone,
      personalEmail: this.personalEmail,
    });
  }

}
