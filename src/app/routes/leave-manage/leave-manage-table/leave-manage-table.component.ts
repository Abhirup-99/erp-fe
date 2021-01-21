import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCheck, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DetailsViewComponent } from 'src/app/dialog/details-view/details-view.component';
import { ManagerService } from 'src/app/service/manager.service';
import { LeaveManage } from 'src/app/types/leave-manage';

@Component({
  selector: 'app-leave-manage-table',
  templateUrl: './leave-manage-table.component.html',
  styleUrls: ['./leave-manage-table.component.scss','../manage.common.scss']
})
export class LeaveManageTableComponent implements OnInit {
  leaveFilterColumn: string[] = ['date', 'reason', 'action'];
  dataFilterSource: LeaveManage[] = [];
  dataRejectedSource: LeaveManage[] = [];
  dataAcceptedSource: LeaveManage[] = [];
  dataPendingSource: LeaveManage[] = [];
  dataSource: LeaveManage[] = [];
  dataTotalSource: any[] = [];
  isPending = true;
  isAccepted = false;
  isRejected = false;
  faCheck = faCheck;
  faEye = faEye;
  faTimes = faTimes;
  constructor(private dialog: MatDialog,private managerService: ManagerService,
              private snackBar: MatSnackBar) {
  }
  async toggleView(status: string): Promise<void>{
    this.isPending = false;
    this.isAccepted = false;
    this.isRejected = false;
    switch (status) {
      case 'accepted':
        this.dataAcceptedSource = await this.getData('accepted');
        this.dataSource = this.dataAcceptedSource;
        this.isAccepted = true;
        break;
      case 'pending':
        this.dataPendingSource = await this.getData('pending');
        this.dataSource = this.dataPendingSource;
        this.isPending = true;
        break;
      case 'rejected':
        this.dataRejectedSource = await this.getData('rejected');
        this.dataSource = this.dataRejectedSource;
        this.isRejected = true;
        break;
      default:
        break;
    }
  }
  async getData(type: string): Promise<LeaveManage[]> {
    const data = await this.managerService.getEmployeeRequests('leave', type).toPromise();
    const refinedData = data.leave.map((el: any, index: number) => {
      const date = (el.leave_start === el.leave_end) ? el.leave_start: `${el.leave_start}-${el.leave_end}`;
      return {
        date,
        status: type,
        description: el.description,
        id: el.leave_id,
        serialNumber: index,
        name: el.creator_name,
        documentId: el.leave_id
      };
    });
    return refinedData;
  }
  detailView(id: number): void {
    console.log(id);
    console.log(this.dataSource[id]);
    const dialogRef = this.dialog.open(DetailsViewComponent, {
      panelClass: 'mat-custom-dialog',
      data: this.dataSource[id]
    });
    dialogRef.afterClosed().subscribe((_) => {
      console.log('The dialog was closed');
    });
  }
  actionFunc(id: string, action: 'accepted' | 'rejected'): void{
    const payload = {
      reqID: id,
      marked: action
    };
    this.managerService.markEmployeeRequests(payload).subscribe((_)=>{
      this.snackBar.open('Succesfully Updated', 'Dismiss', {
        duration: 100,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    },err=>{});
  }
  ngOnInit(): void {
    this.managerService.getEmployeeRequests('leave', 'pending').subscribe((data: any) => {
      this.dataPendingSource = data.leave.map((el: any, index: number) => {
        const date = (el.leave_start === el.leave_end) ? el.leave_start: `${el.leave_start}-${el.leave_end}`;
        return {
          date,
          status: 'pending',
          description: el.description,
          id: el.creator_id,
          serialNumber: index,
          name: el.creator_name,
          documentId: el.leave_id
        };
      });
      this.dataSource = this.dataPendingSource;
    });
  }
}
