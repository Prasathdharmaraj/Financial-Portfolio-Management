import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './base-setup/interceptor/interceptor';
import { DatePipe } from '@angular/common';
import { CustomAngularMaterialModule } from './base-setup/custom-angular-material/custom-angular-material.module';
import { HeaderComponent } from './reuse-folders/reuse-components/header/header.component';
import { CommonLoaderComponent } from './reuse-folders/reuse-components/common-loader/common-loader.component';
import { HomeComponent } from './components/home/home.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './Popups/add-user/add-user.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CommonLoaderComponent,
    HomeComponent,
    UserDataComponent,
    DashboardComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
