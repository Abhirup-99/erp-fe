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
import { SearchComponent } from './routes/search/search.component';

//gaurds
import { AuthGuard } from './auth.guard';
import { ManagerGuard } from './manager.guard';
import { AuthLoginGuard } from './auth-login.guard';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    initialNavigation: 'enabled'
};

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard]},
    {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
    {path: 'request', component: LeaveComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileDashboardComponent, canActivate: [AuthGuard]},
    {path: 'manage-request', component: LeaveManageComponent, canActivate: [AuthGuard,ManagerGuard]},
    {path: 'employee-manage', component: EmployeeDashboardComponent, canActivate: [AuthGuard,ManagerGuard]},
    {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo:'/profile', pathMatch:'full' },
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
