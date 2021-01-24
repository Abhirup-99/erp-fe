import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerService } from 'src/app/service/manager.service';
import { SearchEmployee } from 'src/app/types/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  showForm = false;
  searchForm: FormGroup;
  allEmployees: SearchEmployee[] = [];
  dataColumns = ['name', 'email'];
  constructor(private managerService: ManagerService,private snackBar: MatSnackBar) {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      teamName : new FormControl(''),
      searchFilter : new FormControl(''),
      role : new FormControl('')
    });
   }

  onSubmit(): void{
    this.showForm = false;
    const payLoad = {
      name: this.searchForm.value.name,
      role: this.searchForm.value.role,
      teamID: this.searchForm.value.teamName
    };
    this.managerService.filterSearchEmployee(payLoad).subscribe((res)=>{
      console.log(res);
      // eslint-disable-next-line arrow-body-style
      this.allEmployees = res.employees.map((el: any)=>{
        return {
          name: el.name,
          email: el.email
        };
      });
      this.snackBar.open('Succesfully Updated', 'Dismiss', {
        duration: 100,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    },err=>{});
  }
  ngOnInit(): void {
  }

}
