import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { DetailsViewComponent } from 'src/app/dialog/details-view/details-view.component';
import { RequestBonusComponent } from 'src/app/dialog/request-bonus/request-bonus.component';

@Component({
  selector: 'app-request-bonus-table',
  templateUrl: './request-bonus-table.component.html',
  styleUrls: ['./request-bonus-table.component.scss','../leave.common.scss']
})
export class RequestBonusTableComponent implements OnInit {
  leaveColumn: string[] = ['date', 'status', 'reason', 'action'];
  dataSource: Request[] = [];
  isPending = false;
  isAccepted = false;
  isRejected = false;
  faEye = faEye;
  dataAcceptedSource: Request[] =[];
  dataPendingSource: Request[] =[];
  dataRejectedSource: Request[] =[];
  constructor(private dialog: MatDialog) { }

  openRequestLoan(): void{
    const dialogRef = this.dialog.open(RequestBonusComponent, {
      panelClass: 'mat-custom-dialog'
    });
    dialogRef.afterClosed().subscribe((_) => {
      console.log('The dialog was closed');
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
