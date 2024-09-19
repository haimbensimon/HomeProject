import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { BrowseProductComponent } from './products/browse-product/browse-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { UsersStatusComponent } from './products/users-status/users-status.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'products', component: BrowseProductComponent },
      {
        path: 'edit/products',
        component: EditProductComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'users',
        component: UsersStatusComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomePageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
