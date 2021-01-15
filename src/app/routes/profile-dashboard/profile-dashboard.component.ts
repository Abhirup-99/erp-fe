import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ProfileEditComponent } from '../../dialog/profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
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
