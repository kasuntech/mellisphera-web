import { MyDate } from './../../class/MyDate';
import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { ECharts, EChartOption} from 'echarts';
import { Rucher } from '../rucher';
import { Ruche } from '../ruche';
import { ProcessReport } from '../processedReport';
import { RucherService } from '../rucher.service';
import { UserloggedService } from '../../userlogged.service';
import { selectedRucherService } from '../../accueil/_shared-services/selected-rucher.service';
import { Observable, Subscription } from 'rxjs';
// import { AnonymousSubscription } from "rxjs/Subscription";
import { RucheDetailService } from './ruche.detail.service';
import { DailyRecordsWService } from './service/daily-records-w.service';
import { DailyStockHoneyService } from './service/daily-stock-honey.service';
import { GrapheReserveMielService } from './stock/service/graphe-reserve-miel.service';
import { RecordService } from './service/Record/record.service';
import { DailyRecordService } from '../../accueil/Service/dailyRecordService';
import { RucheService } from '../../accueil/Service/ruche.service';
import { ObservationService } from './observation/service/observation.service';
import { CONFIG } from '../../../config';
import { CalendrierTempIntService } from './daily/service/calendrier-temp-int.service';
import { AtokenStorageService } from '../../auth/Service/atoken-storage.service';
import { RucheInterface } from '../../_model/ruche';

@Component({
  selector: 'app-ruche-detail',
  templateUrl: './ruche.detail.component.html',
  styleUrls : ['./ruche.detail.component.scss']
})

export class RucheDetailComponent implements OnInit, OnDestroy {
    rucheId: string;
    rucheName: string;
    message="";
    hiveSelect: RucheInterface;
    compteurHive: number;
    currentTab: string;
    public img: string;
    private timerSubscription: Subscription;


    constructor(private activatedRoute : ActivatedRoute,
        private route: Router,
        public rucheService: RucheService,
        private observationService: ObservationService,
        private dailyRecordThService: DailyRecordService,
        private dailyRecordWservice: DailyRecordsWService,
        private dailyStockHoneyService : DailyStockHoneyService,
        private recordService: RecordService,
        private userService: UserloggedService,
        public tokenService: AtokenStorageService,
        public calendrierTempInt: CalendrierTempIntService) {
            this.rucheId = null;
            this.compteurHive = 0;
            this.currentTab = 'notes';
            this.hiveSelect = {
                id : null,
                name : 'NaN',
                description : '',
                username : '',
                idApiary: '',
                hivePosX : '',
                hivePosY : '',
                sharingUser : []
              };
            this.img = CONFIG.URL_FRONT + "assets/icons/next-button-4.png";
    }

    ngOnInit() {
        this.rucheId = this.activatedRoute.snapshot.params.id;
        this.rucheName = this.activatedRoute.snapshot.params.name;
        this.observationService.getObservationByIdHive(this.rucheId);
        console.log(this.rucheService.hiveSubject);
        this.rucheService.hiveSubject.subscribe( () => {}, () => {}, () => {
            this.rucheService.findRucheById(this.rucheId, (hive) => {
                this.hiveSelect = hive;
                console.log(this.hiveSelect);
                this.compteurHive = this.rucheService.ruches.indexOf(this.hiveSelect);
                this.rucheService.saveCurrentHive(this.hiveSelect.id);
            });
        });
    }


    receiveMessage($event){
        this.message=$event;
    }

    previousHive(){
        if (this.compteurHive != 0 && this.compteurHive != -1) {
            this.compteurHive--;
            this.hiveSelect = this.rucheService.ruches[this.compteurHive];
            this.rucheId = this.hiveSelect.id;
            this.rucheName = this.hiveSelect.name;
            this.rucheService.saveCurrentHive(this.hiveSelect.id);
            this.exeData();
        }

    }

    nextHive(){
        if(this.compteurHive != this.rucheService.ruches.length-1){
             this.compteurHive++;
        }
        this.hiveSelect = this.rucheService.ruches[this.compteurHive];
        this.rucheId = this.hiveSelect.id;
        this.rucheName = this.hiveSelect.name;
        this.rucheService.saveCurrentHive(this.hiveSelect.id);
        this.exeData();
    }


    onTab(event : string){
        this.currentTab = event;
        console.log(this.currentTab);
        this.exeData();


    }
    exeData(){
        if(this.currentTab.indexOf("notes")!=-1){
          this.observationService.getObservationByIdHive(this.rucheId);
        }
        else if(this.currentTab.indexOf("daily")!=-1){
          this.dailyRecordThService.getByIdHive(this.rucheId);
          this.dailyRecordWservice.getDailyRecordsWbyIdHive(this.rucheId);
        }
        else if(this.currentTab.indexOf("stock")!=-1){
            if (this.dailyStockHoneyService.cuurrentIdHive != this.rucheId) {
                console.log("graph");
                //this.dailyRecordWservice.getDailyRecordsWbyIdHive(this.hiveSelect.id);
                this.dailyStockHoneyService.getDailyStockHoneyByHive(this.rucheId);
            }
            if (this.dailyRecordWservice.currentIdHive != this.rucheId) {
                console.log("calendrier");
                this.dailyRecordWservice.getDailyRecordsWbyIdHive(this.rucheId);
            }
        }
        else if(this.currentTab.indexOf("hourly")!=-1){
            if(this.recordService.currentIdHive != this.rucheId) {
                this.recordService.getRecordByIdHive(this.rucheId, MyDate.getRange());
            }
        }
        else if(this.currentTab.indexOf("health")!=-1){
          this.dailyRecordThService.getByIdHive(this.rucheId);
        }
        else if(this.currentTab.indexOf("stack")!=-1){
            if(this.recordService.currentIdHive != this.rucheId ){
                this.recordService.getRecordByIdHive(this.rucheId, MyDate.getRange());
            }
        }
        console.log(this.hiveSelect);
    }

    ngOnDestroy() {
        this.rucheService.hiveSubject.unsubscribe();
        this.observationService.obsHiveSubject.unsubscribe();
        this.observationService.obsApiarySubject.unsubscribe();
    }

}
