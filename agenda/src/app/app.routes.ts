// app.routes.ts
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ReunionesComponent } from './component/reuniones/reuniones.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reuniones', component: ReunionesComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(routes);
