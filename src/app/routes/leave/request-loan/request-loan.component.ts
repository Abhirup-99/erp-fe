import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { DetailsViewComponent } from 'src/app/dialog/details-view/details-view.component';
import { Request } from 'src/app/types/request';
import { RequestLoanComponent } from '../../../dialog/request-loan/request-loan.component';
import { BeService } from '../../../service/be.service';

@Component({
  selector: 'app-request-loan-table',
  templateUrl: './request-loan.component.html',
  styleUrls: ['./request-loan.component.scss','../leave.common.scss']
})
export class RequestLoanTableComponent implements OnInit {
  leaveColumn: string[] = ['date', 'status', 'reason', 'action'];
  dataSource: Request[] = [];
  isPending = false;
  isAccepted = false;
  isRejected = false;
  faEye = faEye;
  dataAcceptedSource: Request[] =[];
  dataPendingSource: Request[] =[];
  dataRejectedSource: Request[] =[];
  constructor(private dialog: MatDialog, private beService: BeService,
              private snackBar: MatSnackBar) { }

  openRequestLoan(): void{
    const dialogRef = this.dialog.open(RequestLoanComponent, {
      panelClass: 'mat-custom-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(Object.keys(result).length === 0 && result.constructor === Object){
        return;
      }
      this.beService.createEmployeeLoanRaise(result).subscribe((res: any)=>{
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
  async getData(type: string): Promise<Request[]> {
    const data = await this.beService.getEmployeeData('loan', type).toPromise();
    const refinedData = data.loan.map((el: any,index: number) => {
      const date = el.created;
      return {
        date,
        status: type,
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
    this.beService.getEmployeeData('loan', 'pending').subscribe((data: any) => {
      this.dataPendingSource = data.loan.map((el: any, index: number) => {
        const date = el.created;
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
