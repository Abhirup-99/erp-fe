import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { DetailsViewComponent } from 'src/app/dialog/details-view/details-view.component';
import { RequestBonusComponent } from 'src/app/dialog/request-bonus/request-bonus.component';
import { BeService } from '../../../service/be.service';

@Component({
  selector: 'app-request-bonus-table',
  templateUrl: './request-bonus-table.component.html',
  styleUrls: ['./request-bonus-table.component.scss', '../leave.common.scss']
})
export class RequestBonusTableComponent implements OnInit {
  leaveColumn: string[] = ['date', 'status', 'action'];
  dataSource: Request[] = [];
  isPending = false;
  isAccepted = false;
  isRejected = false;
  faEye = faEye;
  dataAcceptedSource: Request[] = [];
  dataPendingSource: Request[] = [];
  dataRejectedSource: Request[] = [];
  constructor(private dialog: MatDialog, private beService: BeService,
    private snackBar: MatSnackBar) { }

  openRequestLoan(): void {
    const dialogRef = this.dialog.open(RequestBonusComponent, {
      panelClass: 'mat-custom-dialog'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.beService.createEmployeeLoanRaise(result).subscribe((res) => {
        this.snackBar.open('Redirecting', 'Dismiss', {
          duration: 100,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        console.log('The dialog was closed');
      });
    });
  }
  async getData(type: string): Promise<Request[]> {
    const data = await this.beService.getEmployeeData('bonus', type).toPromise();
    const refinedData = data.bonus.map((el: any, index: number) => {
      const date = el.created;
      console.log(index);
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
  async toggleView(status: string): Promise<void> {
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
    this.beService.getEmployeeData('bonus', 'pending').subscribe((data: any) => {
      this.dataPendingSource = data.bonus.map((el: any, index: number) => {
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

