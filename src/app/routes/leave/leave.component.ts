import { Component, OnInit } from '@angular/core';
import { LeaveElement } from '../../types/leave';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  leaveColumn: string[] = ['date', 'reason', 'status'];
  dataSource: LeaveElement[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
