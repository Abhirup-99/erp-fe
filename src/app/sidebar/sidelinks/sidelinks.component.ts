import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidelinks',
  templateUrl: './sidelinks.component.html',
  styleUrls: ['./sidelinks.component.scss']
})
export class SidelinksComponent implements OnInit {
  isLoggedIn = true;
  isManager = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('accessToken')) {
      this.isLoggedIn = false;
    }
    if (!(localStorage.getItem('isManger') === 'true')) {
      this.isManager = false;
    }
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('test');
      if (!localStorage.getItem('accessToken')) {
        this.isLoggedIn = false;
      }
      if (!(localStorage.getItem('isManger') === 'true')) {
        this.isManager = false;
      }
    });

  }
}
