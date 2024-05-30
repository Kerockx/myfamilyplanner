import { Routes } from '@angular/router';
import { FamilyPage } from '../pages/Family/family/family.page';
import { TaskPage } from '../pages/Task/task/task.page';
import { SchedularPage } from '../pages/Schedular/schedular/schedular.page';
import { DashboardPage } from '../pages/Dashboard/dashboard/dashboard.page';
import { LoginPage } from '../pages/login/login.page';
import { inject } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'schedular',
        pathMatch: 'full'
    },
    {
        path: 'login',
        data: { title: 'Login' },
        component: LoginPage
    },
    {
        path: 'dashboard',
        data: { title: 'Dashboard' },
        component: DashboardPage,
        canActivate: [() => inject(AuthService).isTokenValid()]
    },
    {
        path: 'family',
        data: { title: 'Familie' },
        component: FamilyPage,
        canActivate: [() => inject(AuthService).isTokenValid()]
    },
    {
        path: 'tasks',
        data: { title: 'Aufgaben' },
        component: TaskPage,
        canActivate: [() => inject(AuthService).isTokenValid()]
    },
    {
        path: 'schedular',
        data: { title: 'Planer' },
        component: SchedularPage,
        canActivate: [() => inject(AuthService).isTokenValid()]
    },
];
