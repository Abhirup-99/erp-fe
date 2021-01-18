import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewDetails } from '../../types/view-details';
@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ViewDetails) { }

  ngOnInit(): void {
  }

}
