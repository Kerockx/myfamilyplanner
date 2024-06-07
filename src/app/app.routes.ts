import { Routes } from '@angular/router';
import { FamilyPage } from '../pages/Family/family/family.page';
import { TaskPage } from '../pages/Task/task/task.page';
import { SchedularPage } from '../pages/Schedular/schedular/schedular.page';
import { DashboardPage } from '../pages/Dashboard/dashboard/dashboard.page';
import { LoginPage } from '../pages/login/login.page';
import { inject } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { SetupPage } from '../pages/setup/setup.page';
import { DefFamilyMemberType } from '../models/def-family-member-type.model';
import { defActivityCategoryResolver, defActivityResolver, defFamilyMemberResolver, userResolver } from '../resolver/app-init.resolver';
import { FamilyStorage } from '../config/storage.config';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'setup',
        pathMatch: 'full'
    },
    {
        path: 'login',
        data: { title: 'Login' },
        component: LoginPage
    },
    {
        path: 'setup',
        data: { title: 'Setup' },
        component: SetupPage,
        resolve:{
            DEF_FAMILY_MEMBER_TYPES:defFamilyMemberResolver,
            DEF_ACTIVITIES:defActivityResolver,
            DEF_ACTIVITY_CATEGORIES:defActivityCategoryResolver,
            CURRENT_USER:userResolver
        }
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
