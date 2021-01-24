import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { EditEmployeeDataComponent } from 'src/app/dialog/edit-employee-data/edit-employee-data.component';
import { UpdateManagerComponent } from 'src/app/dialog/update-manager/update-manager.component';
import { ManagerService } from 'src/app/service/manager.service';
import { EmployeeManage } from 'src/app/types/employee-manage';

@Component({
  selector: 'app-unassigned-employees',
  templateUrl: './unassigned-employees.component.html',
  styleUrls: ['./unassigned-employees.component.scss','../dashboard.common.scss']
})
export class UnassignedEmployeesComponent implements OnInit {
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
      this.managerService.updateEmployeeData(result).subscribe((_)=>{
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

  getData(): void {
    this.managerService.getUnassignedEmployees().subscribe((data: any) => {
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
      let variableCounter = 0;
      this.allManagers = data.managers.map((el: any, index: number) => {
        variableCounter = index + 1;
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
      const userData = JSON.parse(localStorage.getItem('profile') as string);
      this.allManagers.push({
        serialNumber: variableCounter,
        managerId: userData.manager_id,
        teamId: userData.team_id,
        role: userData.role,
        name: userData.name,
        managerName: userData.manager_name,
        isManager: userData.is_manager,
        salary: userData.salary,
        email: userData.email,
        id: userData.user_id
      });
    });
  }
  ngOnInit(): void {
    this.getData();
  }

}
