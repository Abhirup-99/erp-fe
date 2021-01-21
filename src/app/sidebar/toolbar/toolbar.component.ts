import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  faUser = faUser;
  constructor(private router: Router,private snackBar: MatSnackBar,
              private authService: AuthService) {
  }
  routerFunc(): void{
    this.router.navigate(['profile']);
  }
  async logOut(): Promise<void>{
    this.snackBar.open('Redirecting', 'Dismiss', {
      duration: 100,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
  }
}
