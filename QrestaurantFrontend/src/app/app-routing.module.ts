import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishComponent } from './components/dish/dish.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { SettingComponent } from './components/setting/setting.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'dishes', component: DishComponent },
  { path: 'ingredients', component: IngredientComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingComponent },
  { path: 'settings/notifications', component: SettingComponent },
  { path: 'settings/automation', component: SettingComponent },
  { path: 'menu', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
