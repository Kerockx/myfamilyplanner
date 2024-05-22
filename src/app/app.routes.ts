import { Routes } from '@angular/router';
import { FamilyPage } from '../pages/Family/family/family.page';
import { TaskPage } from '../pages/Task/task/task.page';
import { SchedularPage } from '../pages/Schedular/schedular/schedular.page';
import { DashboardPage } from '../pages/Dashboard/dashboard/dashboard.page';
import { LoginPage } from '../pages/login/login.page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
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
        component: DashboardPage
    },
    {
        path: 'family',
        data: { title: 'Familie' },
        component: FamilyPage
    },
    {
        path: 'tasks',
        data: { title: 'Aufgaben' },
        component: TaskPage
    },
    {
        path: 'schedular',
        data: { title: 'Planer' },
        component: SchedularPage
    },
];
