import { Component, OnInit } from '@angular/core';
import { ManageAllLeaves } from '../../types/manage-all-leave';
import { faEye, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DetailsViewComponent } from '../../dialog/details-view/details-view.component';
import { BeService } from '../../service/be.service';

@Component({
  selector: 'app-leave-manage',
  templateUrl: './leave-manage.component.html',
  styleUrls: ['./leave-manage.component.scss']
})
export class LeaveManageComponent implements OnInit {

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
  dataAcceptedSource: ManageAllLeaves[] = [];
  dataPendingSource: ManageAllLeaves[] = [];
  dataSource: ManageAllLeaves[] = [];
  dataTotalSource: any[] = [];
  isPending = false;
  isAccepted = false;
  isRejected = false;
  faCheck = faCheck;
  faEye = faEye;
  faTimes = faTimes;
  constructor(private dialog: MatDialog,private beService: BeService) {
  }
  toggleView(status: string): void{
    this.isPending = false;
    this.isAccepted = false;
    this.isRejected = false;
    switch (status) {
      case 'accepted':
        this.dataFilterSource = this.dataAcceptedSource;
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
    this.beService.getManagerLeaveData('pending').subscribe((res)=>{
      console.log(res);
    });
  }

}
