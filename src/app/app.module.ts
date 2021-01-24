import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

// font-awesome imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app.routing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidelinksComponent } from './sidebar/sidelinks/sidelinks.component';
import { LoginComponent } from './routes/login/login.component';
import { CreateComponent } from './routes/create/create.component';
import { LeaveComponent } from './routes/leave/leave.component';
import { LeaveCreateComponent } from './dialog/leave-create/leave-create.component';
import { ToolbarComponent } from './sidebar/toolbar/toolbar.component';
import { ProfileDashboardComponent } from './routes/profile-dashboard/profile-dashboard.component';
import { LeaveManageComponent } from './routes/leave-manage/leave-manage.component';
import { DetailsViewComponent } from './dialog/details-view/details-view.component';
import { ProfileEditComponent } from './dialog/profile-edit/profile-edit.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { EmployeeDashboardComponent } from './routes/employee-dashboard/employee-dashboard.component';
import { RequestLoanComponent } from './dialog/request-loan/request-loan.component';
import { RequestBonusComponent } from './dialog/request-bonus/request-bonus.component';
import { RequestLeaveComponent } from './routes/leave/request-leave/request-leave.component';
import { RequestLoanTableComponent } from './routes/leave/request-loan/request-loan.component';
import { RequestBonusTableComponent } from './routes/leave/request-bonus-table/request-bonus-table.component';
import { LeaveManageTableComponent } from './routes/leave-manage/leave-manage-table/leave-manage-table.component';
import { LoanManageTableComponent } from './routes/leave-manage/loan-manage-table/loan-manage-table.component';
import { RaiseManageTableComponent } from './routes/leave-manage/raise-manage-table/raise-manage-table.component';
import { AllEmployeesComponent } from './routes/employee-dashboard/all-employees/all-employees.component';
import { UnassignedEmployeesComponent } from './routes/employee-dashboard/unassigned-employees/unassigned-employees.component';
import { EditEmployeeDataComponent } from './dialog/edit-employee-data/edit-employee-data.component';
import { UpdateManagerComponent } from './dialog/update-manager/update-manager.component';
import { SearchComponent } from './routes/search/search.component';
import { PayrollComponent } from './dialog/payroll/payroll.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidelinksComponent,
    LoginComponent,
    CreateComponent,
    LeaveComponent,
    LeaveCreateComponent,
    ToolbarComponent,
    ProfileDashboardComponent,
    LeaveManageComponent,
    DetailsViewComponent,
    ProfileEditComponent,
    EmployeeDashboardComponent,
    RequestLoanComponent,
    RequestBonusComponent,
    RequestLeaveComponent,
    RequestLoanTableComponent,
    RequestBonusTableComponent,
    LeaveManageTableComponent,
    LoanManageTableComponent,
    RaiseManageTableComponent,
    AllEmployeesComponent,
    UnassignedEmployeesComponent,
    EditEmployeeDataComponent,
    UpdateManagerComponent,
    SearchComponent,
    PayrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
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
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
