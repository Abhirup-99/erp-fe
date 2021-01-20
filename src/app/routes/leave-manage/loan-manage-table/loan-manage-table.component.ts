import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCheck, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DetailsViewComponent } from 'src/app/dialog/details-view/details-view.component';
import { BeService } from 'src/app/service/be.service';
import { ManageAllLeaves } from 'src/app/types/manage-all-leave';

@Component({
  selector: 'app-loan-manage-table',
  templateUrl: './loan-manage-table.component.html',
  styleUrls: ['./loan-manage-table.component.scss','../manage.common.scss']
})
export class LoanManageTableComponent implements OnInit {
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
    this.beService.getManagerLeaveData('pending').subscribe((res: any)=>{
      console.log(res);
    });
  }

}
