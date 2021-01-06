import { Component, OnInit } from '@angular/core';
import { LeaveElement } from '../../types/leave';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LeaveCreateComponent } from '../../dialog/leave-create/leave-create.component';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  leaveColumn: string[] = ['date', 'reason', 'status'];
  dataSource: LeaveElement[] = [];
  constructor(public dialog: MatDialog) { }
  openDialog(): void{
    const dialogRef = this.dialog.open(LeaveCreateComponent, {
      panelClass: 'mat-custom-dialog1'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit(): void {
  }

}
