import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCheck, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DetailsViewComponent } from 'src/app/dialog/details-view/details-view.component';
import { ManagerService } from 'src/app/service/manager.service';
import { RequestManage } from 'src/app/types/request-mange';

@Component({
  selector: 'app-raise-manage-table',
  templateUrl: './raise-manage-table.component.html',
  styleUrls: ['./raise-manage-table.component.scss','../manage.common.scss']
})
export class RaiseManageTableComponent implements OnInit {
  leaveFilterColumn: string[] = ['date', 'name', 'reason', 'action'];
  dataFilterSource: RequestManage[] = [];
  dataRejectedSource: RequestManage[] = [];
  dataAcceptedSource: RequestManage[] = [];
  dataPendingSource: RequestManage[] = [];
  dataSource: RequestManage[] = [];
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
  async getData(type: string): Promise<RequestManage[]> {
    const data = await this.managerService.getEmployeeRequests('bonus', type).toPromise();
    const refinedData = data.bonus.map((el: any, index: number) => {
      const date = el.created;
      console.log(index);
      return {
        date,
        status: type,
        description: el.description,
        id: el.leave_id,
        serialNumber: index,
        name: el.creator_name,
        documentId: el.id
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
    this.managerService.getEmployeeRequests('bonus', 'pending').subscribe((data: any) => {
      this.dataPendingSource = data.bonus.map((el: any, index: number) => {
        const date = el.created;
        return {
          date,
          status: 'pending',
          description: el.description,
          id: el.creator_id,
          serialNumber: index,
          name: el.creator_name,
          documentId: el.id
        };
      });
      this.dataSource = this.dataPendingSource;
    });
  }

}
