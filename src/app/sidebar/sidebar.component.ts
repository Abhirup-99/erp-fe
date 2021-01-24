import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './sidenav.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,AfterViewInit {
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;
  constructor(private sidenavService: SidenavService) { }
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
  ngOnInit(): void {
  }

}
