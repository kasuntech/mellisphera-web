import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { MeteoComponent } from './accueil/meteo/meteo.component';
import { UserComponent } from './user/user.component';
import { RucheRucherComponent } from './accueil/ruche-rucher/ruche.rucher.component';
import { RucheDetailComponent } from './accueil/ruche-rucher/ruche-detail/ruche.detail.component';
import { CapteurComponent } from './accueil/capteur/capteur.component';
import { NouveauCapteurComponent } from './accueil/capteur/nouveau-capteur/nouveau-capteur.component';
import { GraphComponent } from './accueil/graph/graph.component';
import { FleursFloraisonComponent } from './accueil/fleurs-floraison/fleurs.floraison.component';

import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControldashboardComponent } from './controldashboard/controldashboard.component';
import { AccueilComponent } from './accueil/accueil.component';
import { RapportComponent } from './accueil/rapport/rapport.component';

import { ReactiveFormsModule } from '@angular/forms';

import { CapteurService } from './accueil/capteur/capteur.service';
import { RucherService } from './accueil/ruche-rucher/rucher.service';
import { TestService } from './test/test.service';
import { UserloggedService } from './userlogged.service';
import { UsersService } from './auth/users.service';
import { selectedRucherService } from './accueil/_shared-services/selected-rucher.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GraphService } from './accueil/graph/graph.service';
import { RapportService } from './accueil/rapport/rapport.service';
import { FleursFloraisonService } from './accueil/fleurs-floraison/fleurs.floraison.service';
import { RucheDetailService } from './accueil/ruche-rucher/ruche-detail/ruche.detail.service';
import { DispositionRucheComponent } from './accueil/disposition-ruche/disposition-ruche.component';

import { DailyRecordService } from './accueil/disposition-ruche/Service/dailyRecordService';
import { DragAndCheckModule, Offsets } from 'ng2-drag-and-check';
import { MeteoService } from './accueil/meteo/Service/MeteoService';
import { RucheService } from './accueil/disposition-ruche/Service/ruche.service';

import { NgxEchartsModule } from 'ngx-echarts';
import { CalendrierService } from './accueil/meteo/Service/calendrier.service';
import { CalendrierPoidsService } from './accueil/ruche-rucher/ruche-detail/service/calendrier-poids.service';
import { DailyRecordsWService } from './accueil/ruche-rucher/ruche-detail/service/daily-records-w.service';
import { DailyStockHoneyService } from './accueil/ruche-rucher/ruche-detail/service/daily-stock-honey.service';
import { GraphMeteoService } from './accueil/meteo/Service/graph-meteo.service';
import { RecordService } from './accueil/ruche-rucher/ruche-detail/service/Record/record.service';
import { GraphRecordService } from './accueil/ruche-rucher/ruche-detail/service/Record/graph-record.service';
import { CalendrierHealthService } from './accueil/ruche-rucher/ruche-detail/service/health/calendrier-health.service';
import { RucheNavbarComponent } from './accueil/ruche-rucher/ruche-detail/ruche-navbar/ruche-navbar.component';
import { HealthComponent } from './accueil/ruche-rucher/ruche-detail/health/health.component';
import { StockComponent } from './accueil/ruche-rucher/ruche-detail/stock/stock.component';
import { HourlyComponent } from './accueil/ruche-rucher/ruche-detail/hourly/hourly.component';
import { DailyComponent } from './accueil/ruche-rucher/ruche-detail/daily/daily.component';
import { ObservationComponent } from './accueil/ruche-rucher/ruche-detail/observation/observation.component';

//import { NgDraggableModule } from 'angular-draggable'; 

@NgModule({
  declarations: [
    NouveauCapteurComponent,
    CapteurComponent,
    AppComponent,
    HomeComponent,
    TestComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    DashboardComponent,
    ControldashboardComponent,
    AccueilComponent,
    RucheRucherComponent,
    MeteoComponent,
    GraphComponent,
    RucheDetailComponent,
    RapportComponent,
    FleursFloraisonComponent,
    DispositionRucheComponent,
    RucheNavbarComponent,
    HealthComponent,
    StockComponent,
    HourlyComponent,
    DailyComponent,
    ObservationComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    LbdModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragAndCheckModule,
    NgxEchartsModule
    //NgDraggableModule
  ],
  providers: [
    CapteurService,
    UserloggedService,
    AuthService,
    AuthGuardService,
    JwtHelperService,
    UsersService,
    RucherService,
    selectedRucherService,
    TestService,
    GraphService,
    RapportService,
    FleursFloraisonService,
    RucheDetailService,
    MeteoService,
    DailyRecordService,
    RucheService,
    CalendrierService,
    CalendrierPoidsService,
    DailyRecordsWService,
    DailyStockHoneyService,
    GraphMeteoService,
    RecordService,
    GraphRecordService,
    CalendrierHealthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
