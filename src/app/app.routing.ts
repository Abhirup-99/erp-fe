import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';

// components
import { LoginComponent } from './routes/login/login.component';
import { CreateComponent } from './routes/create/create.component';
import { LeaveComponent } from './routes/leave/leave.component';
import { ProfileDashboardComponent } from './routes/profile-dashboard/profile-dashboard.component';
import { LeaveManageComponent } from './routes/leave-manage/leave-manage.component';
import { EmployeeDashboardComponent } from './routes/employee-dashboard/employee-dashboard.component';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    initialNavigation: 'enabled'
};

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'create', component: CreateComponent},
    {path: 'leave', component: LeaveComponent},
    {path: 'profile', component: ProfileDashboardComponent},
    {path: 'manage-leave', component: LeaveManageComponent},
    {path: 'employee-manage', component: EmployeeDashboardComponent}
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, routerOptions),
        CommonModule,
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
