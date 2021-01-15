import { Component, OnInit } from '@angular/core';
import { ManageAllLeaves } from '../../types/manage-all-leave';
import { ManageLeaves } from '../../types/manage-leave';
import { faEye, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DetailsViewComponent } from '../../dialog/details-view/details-view.component';

@Component({
  selector: 'app-leave-manage',
  templateUrl: './leave-manage.component.html',
  styleUrls: ['./leave-manage.component.scss']
})
export class LeaveManageComponent implements OnInit {

  leaveColumn: string[] = ['date', 'reason', 'status', 'action'];
  leaveFilterColumn: string[] = ['date', 'reason', 'action'];
  dataFilterSource: ManageAllLeaves[] = [];
  dataRejectedSource: ManageAllLeaves[] = [
  {
    date: 'string',
    description: 'string',
    id: 'string',
    serialNumber: 0,
    status:'accepted'
  }
];
  dataAcceptedSource: ManageLeaves[] = [];
  dataTotalSource: ManageAllLeaves[] = [];
  dataPendingSource: ManageAllLeaves[] = [];
  dataSource: ManageAllLeaves[] = [];
  isAll = true;
  isPending = false;
  isAccepted = false;
  isRejected = false;
  faCheck = faCheck;
  faEye = faEye;
  faTimes = faTimes;
  constructor(private dialog: MatDialog) {
    this.dataSource = this.dataTotalSource;
  }
  toggleView(status: string): void{
    this.isAll = false;
    this.isPending = false;
    this.isAccepted = false;
    this.isRejected = false;
    switch (status) {
      case 'all':
        this.dataSource = this.dataTotalSource;
        this.isAll = true;
        break;
      case 'accepted':
        this.dataFilterSource = this.dataTotalSource;
        this.isAccepted = true;
        break;
      case 'pending':
        this.dataSource = this.dataPendingSource;
        this.isPending = true;
        break;
      case 'rejected':
        this.dataFilterSource = this.dataRejectedSource;
        this.isRejected = true;
        break;
      default:
        break;
    }
  }
  detailView(id: number): void{
    console.log(id);
    console.log(this.dataFilterSource[id]);
    const dialogRef = this.dialog.open(DetailsViewComponent, {
      panelClass: 'mat-custom-dialog',
      data:this.dataFilterSource[id]
    });
    dialogRef.afterClosed().subscribe((_) => {
      console.log('The dialog was closed');
    });
  }
  accept(id: string): void{}
  reject(id: string): void{}
  ngOnInit(): void {
  }

}
