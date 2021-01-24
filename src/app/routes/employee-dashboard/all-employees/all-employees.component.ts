import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/service/manager.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { EmployeeManage } from 'src/app/types/employee-manage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEmployeeDataComponent } from 'src/app/dialog/edit-employee-data/edit-employee-data.component';
import { UpdateManagerComponent } from 'src/app/dialog/update-manager/update-manager.component';
import { PayrollComponent } from 'src/app/dialog/payroll/payroll.component';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss','../dashboard.common.scss']
})
export class AllEmployeesComponent implements OnInit {
  faPencil = faPencilAlt;
  allManagers: EmployeeManage[] = [];
  allEmployees: EmployeeManage[] = [];
  dataColumns = ['name', 'email', 'action'];
  constructor(private dialog: MatDialog,private managerService: ManagerService,
    private snackBar: MatSnackBar) { }

  getEditView(id: number): void{
    const dialogRef = this.dialog.open(EditEmployeeDataComponent, {
      panelClass: 'mat-custom-dialog',
      data: this.allEmployees[id]
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(Object.keys(result).length === 0 && result.constructor === Object){
        return;
      }
      this.managerService.updateEmployeeData(result).subscribe((_)=>{
        this.snackBar.open('Succesfully Updated', 'Dismiss', {
          duration: 100,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },err=>{});
    });
  }

  addPayroll(id: number): void{
    console.log('clicked');
    const dialogRef = this.dialog.open(PayrollComponent, {
      panelClass: 'mat-custom-dialog',
      data: this.allEmployees[id]
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(Object.keys(result).length === 0 && result.constructor === Object){
        return;
      }
      this.managerService.addTransaction(this.allEmployees[id].id,result).subscribe((_)=>{
        this.snackBar.open('Succesfully Updated', 'Dismiss', {
          duration: 100,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },err=>{});
    });
  }

  updateManager(id: number): void{
    console.log('clicked');
    const dialogRef = this.dialog.open(UpdateManagerComponent, {
      panelClass: 'mat-custom-dialog',
      data: {...this.allEmployees[id],managers:this.allManagers}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(Object.keys(result).length === 0 && result.constructor === Object){
        return;
      }
      this.managerService.addManager(this.allEmployees[id].id,result.manager).subscribe((_)=>{
        this.snackBar.open('Succesfully Updated', 'Dismiss', {
          duration: 100,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },err=>{});
    });
  }

  removeManager(id: number): void{
    this.managerService.removeManager(this.allEmployees[id].id,this.allEmployees[id].managerId)
      .subscribe((_)=>{
        this.snackBar.open('Succesfully Updated', 'Dismiss', {
          duration: 100,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },err=>{});
  }

  ngOnInit(): void {
    this.managerService.getJuniorEmployees().subscribe((data: any) => {
      this.allEmployees = data.employees.map((el: any, index: number) => {
        index =index+1-1;
        return {
          serialNumber: index,
          id: el.user_id,
          email: el.email,
          salary: el.salary,
          isManager: false,
          managerName: el.manager_name,
          name: el.name,
          role: el.role,
          teamId: el.team_id,
          managerId: el.manager_id
        };
      });
    });
    this.managerService.getJuniorManagers().subscribe((data: any) => {
      console.log(data);
      this.allManagers = data.managers.map((el: any, index: number) => {
        index = index + 1 - 1;
        return {
          serialNumber: index,
          id: el.user_id,
          email: el.email,
          salary: el.salary,
          isManager: false,
          managerName: el.manager_name,
          name: el.name,
          role: el.role,
          teamId: el.team_id,
          managerId: el.manager_id
        };
      });
    });
  }
}
