import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from './navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MyDatePipe } from '../../pipe/my-date.pipe';
import { SearchCapteur } from '../../pipe/capteur.pipe';
import { PipeCapteur } from '../../pipe/capteur.pipe';
import { ngfModule } from 'angular-file';


@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    NavbarModule,
    RouterModule,
    // BrowserModule,
    FormsModule,
  ],
  exports: [
    TranslateModule,
    NgxEchartsModule,
    PipeCapteur,
    MyDatePipe,
    SearchCapteur
  ],
  declarations: [
    MyDatePipe,
    PipeCapteur,
    SearchCapteur

  ],
  providers: [
  ]
})
export class SharedModule { }
