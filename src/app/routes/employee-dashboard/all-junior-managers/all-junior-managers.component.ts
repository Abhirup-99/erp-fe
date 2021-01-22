import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerService } from 'src/app/service/manager.service';
import { EmployeeManage } from 'src/app/types/employee-manage';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-junior-managers',
  templateUrl: './all-junior-managers.component.html',
  styleUrls: ['./all-junior-managers.component.scss','../dashboard.common.scss']
})
export class AllJuniorManagersComponent implements OnInit {
  allEmployees: EmployeeManage[] = [];
  dataColumns = ['name', 'email', 'action'];
  faTimes = faTimes;
  constructor(private managerService: ManagerService, private snackBar: MatSnackBar) { }

  updatePermission(id: string): void{
    const payLoad = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      user_id: id,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      is_manager: false
    };
    this.managerService.updateEmployeeData(payLoad).subscribe((_)=>{
      this.snackBar.open('Succesfully Updated', 'Dismiss', {
        duration: 100,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
  ngOnInit(): void {
    this.managerService.getJuniorManagers().subscribe((data: any) => {
      console.log(data);
      this.allEmployees = data.managers.map((el: any, index: number) => {
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
