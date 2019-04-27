import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
// import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
import { LoginPageComponent } from './login-page/login-page.component';
// import { DynamicMenuPageComponent } from 'app/projects/hk/pages/dynamic-menu-page/dynamic-menu-page.component';
// import { LoginPageComponent } from 'app/projects/hk/pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent, data: { title: "系统登陆" } },
  // {
  // path: 'hk',
  // loadChildren: 'app/projects/hk/hk.module#HkModule'
  // },
  {
    path: 'dev',
    loadChildren: 'app/projects/dev/dev.module#DevModule'
  },
  {
    path: 'xfd_fk',
    loadChildren: 'app/projects/xfd_fk/xfd_fk.module#XFDFKModule'
  },
 
  // passport
  // 单页不包裹Layout 
  {
    path: 'lock',
    component: UserLockComponent,
    data: { title: '锁屏', titleI18n: 'lock' },
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
