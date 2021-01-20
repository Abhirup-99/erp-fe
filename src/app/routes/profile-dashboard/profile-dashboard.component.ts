import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProfileEditComponent } from '../../dialog/profile-edit/profile-edit.component';
import { RequestBonusComponent } from '../../dialog/request-bonus/request-bonus.component';
import { RequestLoanComponent } from '../../dialog/request-loan/request-loan.component';
import { BeService } from '../../service/be.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {

  employeeData$: Observable<any>;
  constructor(private dialog: MatDialog, private beService: BeService) {
    this.employeeData$ = this.beService.getMyInfo();
  }
  openRequestBonus(): void{
    const dialogRef = this.dialog.open(RequestBonusComponent,{
      panelClass:'mat-bonus-dialog'
    });
    dialogRef.afterClosed().subscribe((_) => {
      console.log('The dialog was closed');
    });
  }
  openDialog(): void{
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      panelClass: 'mat-custom-dialog'
    });
    dialogRef.afterClosed().subscribe((_) => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit(): void {
  }

}
