import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ProfileEditComponent } from '../../dialog/profile-edit/profile-edit.component';
import { BeService } from '../../service/be.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {

  employeeData$: Observable<any>;
  employeeInfo: any;
  constructor(private dialog: MatDialog, private beService: BeService,
              private snackBar: MatSnackBar) {
    this.employeeData$ = this.beService.getMyInfo();
  }
  openDialog(): void{
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data: this.employeeInfo.user_data,
      panelClass: 'mat-custom-dialog'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if(Object.keys(result).length === 0 && result.constructor === Object){
        return;
      }
      this.beService.employeeUpdateData(result).subscribe((_)=>{
        this.snackBar.open('Succesfully Updated', 'Dismiss', {
          duration: 100,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },err=>{});
      console.log('The dialog was closed');
    });
  }
  async ngOnInit(): Promise<void> {
    this.employeeInfo = await this.employeeData$.toPromise();
    localStorage.setItem('isManger', this.employeeInfo.user_data.is_manager);
  }

}
