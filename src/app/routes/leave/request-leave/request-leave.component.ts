import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCheck, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DetailsViewComponent } from 'src/app/dialog/details-view/details-view.component';
import { LeaveCreateComponent } from 'src/app/dialog/leave-create/leave-create.component';
import { BeService } from 'src/app/service/be.service';
import { LeaveElement } from 'src/app/types/leave';

@Component({
  selector: 'app-request-leave',
  templateUrl: './request-leave.component.html',
  styleUrls: ['./request-leave.component.scss','../leave.common.scss']
})
export class RequestLeaveComponent implements OnInit {
  leaveColumn: string[] = ['date', 'reason', 'action'];
  dataPendingSource: LeaveElement[] = [];
  dataRejectedSource: LeaveElement[] = [];
  dataAcceptedSource: LeaveElement[] = [];
  dataSource: LeaveElement[] = [];
  isPending = false;
  isAccepted = false;
  isRejected = false;
  faCheck = faCheck;
  faEye = faEye;
  faTimes = faTimes;
  constructor(private dialog: MatDialog, private beService: BeService,
              private snackBar: MatSnackBar) { }
  openDialog(): void{
    const dialogRef = this.dialog.open(LeaveCreateComponent, {
      panelClass: 'mat-custom-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.beService.submitLeaveApplication(result).subscribe((res)=>{
        this.snackBar.open('Redirecting', 'Dismiss', {
          duration: 100,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.log('The dialog was closed');
      });
    });
  }
  detailView(id: number): void{
    console.log(id);
    console.log(this.dataSource[id]);
    const dialogRef = this.dialog.open(DetailsViewComponent, {
      panelClass: 'mat-custom-dialog',
      data:this.dataSource[id]
    });
    dialogRef.afterClosed().subscribe((_) => {
      console.log('The dialog was closed');
    });
  }
  async getData(type: string): Promise<LeaveElement[]>{
    const data = await this.beService.getEmployeeData('leave',type).toPromise();
      const refinedData = data.leave.map((el: any, index: number) => {
        const date = (el.leave_start === el.leave_end) ? el.leave_start: `${el.leave_start}-${el.leave_end}`;
        return {
          date,
          status: 'pending',
          description: el.description,
          id: el.leave_id,
          serialNumber: index
        };
      });
      return refinedData;
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
  ngOnInit(): void {
    this.beService.getEmployeeData('leave','pending').subscribe((data: any)=>{
      this.dataPendingSource =data.leave.map((el: any, index: number) => {
        const date = (el.leave_start === el.leave_end) ? el.leave_start: `${el.leave_start}-${el.leave_end}`;
        return {
          date,
          status: 'pending',
          description: el.description,
          id: el.leave_id,
          serialNumber: index
        };
      });
      this.dataSource = this.dataPendingSource;
    });
  }

}
