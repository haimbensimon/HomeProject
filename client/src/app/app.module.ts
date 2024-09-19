import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { RegisterComponent } from './account/register/register.component';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { BrowseProductComponent } from './products/browse-product/browse-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { UsersStatusComponent } from './products/users-status/users-status.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    HomePageComponent,
    BrowseProductComponent,
    EditProductComponent,
    UsersStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
