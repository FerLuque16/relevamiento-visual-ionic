import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./components/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'cosasLindas',
    loadChildren: () => import('./components/cosas-lindas/cosas-lindas.module').then( m => m.CosasLindasPageModule)
  },
  {
    path: 'cosasFeas',
    loadChildren: () => import('./components/cosas-feas/cosas-feas.module').then( m => m.CosasFeasPageModule)
  },
  {
    path: 'graficos',
    loadChildren: () => import('./components/graficos/graficos.module').then( m => m.GraficosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
