import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCheck, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  constructor(private dialog: MatDialog,private beService: BeService) { }
  openDialog(): void{
    const dialogRef = this.dialog.open(LeaveCreateComponent, {
      panelClass: 'mat-custom-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.beService.submitLeaveApplication(result).subscribe((res)=>{
        console.log(res);
        console.log('The dialog was closed');
      });
    });
  }
  toggleView(status: string): void{
    this.isPending = false;
    this.isAccepted = false;
    this.isRejected = false;
    switch (status) {
      case 'accepted':
        this.dataSource = this.dataAcceptedSource;
        this.isAccepted = true;
        break;
      case 'pending':
        this.dataSource = this.dataPendingSource;
        this.isPending = true;
        break;
      case 'rejected':
        this.dataSource = this.dataRejectedSource;
        this.isRejected = true;
        break;
      default:
        break;
    }
  }
  ngOnInit(): void {
  }

}
