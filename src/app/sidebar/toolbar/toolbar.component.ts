import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  faUser = faUser;
  constructor(private router: Router) {
  }
  routerFunc(): void{
    this.router.navigate(['profile']);
  }
  ngOnInit(): void {
  }
}
