import { Component, OnInit } from '@angular/core';
import { ManageAllLeaves } from '../../types/manage-all-leave';
import { ManageLeaves } from '../../types/manage-leave';
import { faEye, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-leave-manage',
  templateUrl: './leave-manage.component.html',
  styleUrls: ['./leave-manage.component.scss']
})
export class LeaveManageComponent implements OnInit {

  leaveColumn: string[] = ['date', 'reason', 'status', 'action'];
  leaveFilterColumn: string[] = ['date', 'reason', 'action'];
  dataFilterSource: ManageLeaves[] = [];
  dataRejectedSource: ManageLeaves[] = [
  {
    date: 'string',
    description: 'string',
    id: 'string'
  }
];
  dataAcceptedSource: ManageLeaves[] = [];
  dataTotalSource: ManageAllLeaves[] = [];
  dataPendingSource: ManageAllLeaves[] = [];
  dataSource: ManageAllLeaves[] = [];
  isAll = true;
  isPending = false;
  isAccepted = false;
  isRejected = false;
  faCheck = faCheck;
  faEye = faEye;
  faTimes = faTimes;
  constructor() {
    this.dataSource = this.dataTotalSource;
  }
  toggleView(status: string): void{
    this.isAll = false;
    this.isPending = false;
    this.isAccepted = false;
    this.isRejected = false;
    switch (status) {
      case 'all':
        this.dataSource = this.dataTotalSource;
        this.isAll = true;
        break;
      case 'accepted':
        this.dataFilterSource = this.dataTotalSource;
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
  detailView(id: string): void{}
  accept(id: string): void{}
  reject(id: string): void{}
  ngOnInit(): void {
  }

}
