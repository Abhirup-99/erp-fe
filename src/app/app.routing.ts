import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';

// components
import { LoginComponent } from './routes/login/login.component';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    initialNavigation: 'enabled'
};

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent}
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
