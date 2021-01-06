import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app.routing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidelinksComponent } from './sidebar/sidelinks/sidelinks.component';
import { LoginComponent } from './routes/login/login.component';
import { CreateComponent } from './routes/create/create.component';
import { LeaveComponent } from './routes/leave/leave.component';
import { LeaveCreateComponent } from './dialog/leave-create/leave-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidelinksComponent,
    LoginComponent,
    CreateComponent,
    LeaveComponent,
    LeaveCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
