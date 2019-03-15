import { RucherService } from './../rucher.service';
import { DataRange } from './service/Record/data-range';
import { MyDate } from '../../../class/MyDate';
import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserloggedService } from '../../../userlogged.service';
// import { AnonymousSubscription } from "rxjs/Subscription";
import { DailyRecordsWService } from './service/daily-records-w.service';
import { DailyStockHoneyService } from './service/daily-stock-honey.service';
import { RecordService } from './service/Record/record.service';
import { DailyRecordService } from '../../../accueil/Service/dailyRecordService';
import { RucheService } from '../../../accueil/Service/ruche.service';
import { ObservationService } from './observation/service/observation.service';
import { CONFIG } from '../../../../config';
import { CalendrierTempIntService } from './daily/service/calendrier-temp-int.service';
import { AtokenStorageService } from '../../../auth/Service/atoken-storage.service';
import { RucheInterface } from '../../../_model/ruche';
import { GraphStackService } from './stack/service/graph-stack.service';
import { GraphRecordService } from './hourly/service/graph-record.service';

@Component({
    selector: 'app-ruche-detail',
    templateUrl: './ruche.detail.component.html',
    styleUrls: ['./ruche.detail.component.scss']
})

export class RucheDetailComponent implements OnInit, OnDestroy {
    message: string;
    hiveSelect: RucheInterface;
    compteurHive: number;
    currentTab: string;
    public img: string;
    private merge: any;
    public range: DataRange;
    private echartInstance: any;
    public ranges: DataRange[];
    constructor(private activatedRoute: ActivatedRoute,
        private route: Router,
        public rucheService: RucheService,
        private observationService: ObservationService,
        private dailyRecordThService: DailyRecordService,
        private dailyRecordWservice: DailyRecordsWService,
        private dailyStockHoneyService: DailyStockHoneyService,
        private recordService: RecordService,
        private userService: UserloggedService,
        public tokenService: AtokenStorageService,
        public calendrierTempInt: CalendrierTempIntService,
        public graphStack: GraphStackService,
        public graphRecordService: GraphRecordService) {
        this.compteurHive = 0;
        this.currentTab = 'notes';
        this.hiveSelect = {
            id: null,
            name: '....',
            description: '',
            username: '',
            idApiary: '',
            hivePosX: '',
            hivePosY: '',
            sharingUser: []
        };
        this.merge = {
            series: [],
            legend: {
                data: []
            }
        };
        this.ranges = [
            { scale: 15, type: 'DAY' },
            { scale: 30, type: 'DAY' },
            { scale: 3, type: 'MONTH' },
            { scale: 6, type: 'MONTH' }
        ];
        this.range = this.ranges[0];
        this.recordService.setRange(this.range);
        this.message = '';
        this.img = CONFIG.URL_FRONT + 'assets/icons/next-button-4.png';
    }

    ngOnInit() {
        if (!this.observationService.obsHiveSubject.closed) {
            this.observationService.getObservationByIdHive(this.rucheService.getCurrentHive());
        }
        if (!this.rucheService.hiveSubject.closed) {
            this.rucheService.hiveSubject.subscribe(() => { }, () => { }, () => {
                console.log(this.rucheService.ruches);
                this.rucheService.findRucheById(this.rucheService.getCurrentHive(), (hive) => {
                    this.hiveSelect = hive[0];
                    console.log(this.hiveSelect);
                    this.compteurHive = this.rucheService.ruches.indexOf(this.hiveSelect);
                    this.rucheService.saveCurrentHive(this.hiveSelect.id);
                });
            });
        }

    }

    onChartInit($event) {
        this.echartInstance = $event;
        console.log(this.echartInstance);
    }

    receiveMessage($event) {
        this.message = $event;
    }

    previousHive() {
        if (this.compteurHive != 0 && this.compteurHive != -1) {
            this.compteurHive--;
            this.hiveSelect = this.rucheService.ruches[this.compteurHive];
            this.rucheService.saveCurrentHive(this.hiveSelect.id);
            this.exeData(true);
        }

    }

    nextHive() {
        if (this.compteurHive != this.rucheService.ruches.length - 1) {
            this.compteurHive++;
        }
        this.hiveSelect = this.rucheService.ruches[this.compteurHive];
        this.rucheService.saveCurrentHive(this.hiveSelect.id);
        this.rucheService.saveCurrentHive(this.hiveSelect.id);
        this.exeData(true);
    }

    updateEchartInstance() {
        const option = this.echartInstance.getOption();
        console.log(option);
        this.echartInstance.clear();
        option.series = this.recordService.mergeOptionStack.series;
        option.legend.data = this.recordService.mergeOptionStack.legend.data;
        this.echartInstance.setOption(option);
    }
    selectRange(type?: string) {
        console.log(this.range);
        this.recordService.setRange(this.range);
        if (type === 'stack') {
            this.recordService.getRecordByIdHive(this.rucheService.getCurrentHive(), this.hiveSelect.name, this.merge, true)
            .subscribe(
                (record) => {
                    console.log(record);
                    this.recordService.mergeOptionStack = record;
                }
            );
        } else {
            this.recordService.getHourlyByHive(this.rucheService.getCurrentHive())
            .subscribe(
                (record) => {
                    console.log(record);
                    this.recordService.mergeOptionHourly = record;
                }
            );
        }
    }

    onTab(event: string) {
        this.currentTab = event;
        this.exeData();
    }
    exeData(switchHive?: boolean) {
        if (this.currentTab.indexOf('notes') != -1) {
            this.observationService.getObservationByIdHive(this.rucheService.getCurrentHive());
        } else if (this.currentTab.indexOf('daily') != -1) {
            this.dailyRecordThService.getByIdHive(this.rucheService.getCurrentHive());
            this.dailyRecordWservice.getDailyRecordsWbyIdHive(this.rucheService.getCurrentHive());
        } else if (this.currentTab.indexOf('stock') != -1) {
            if (this.dailyStockHoneyService.currentIdHive != this.rucheService.getCurrentHive()) {
                this.dailyStockHoneyService.getDailyStockHoneyByHive(this.rucheService.getCurrentHive());
            }
            if (this.dailyRecordWservice.currentIdHive != this.rucheService.getCurrentHive()) {
                this.dailyRecordWservice.getDailyRecordsWbyIdHive(this.rucheService.getCurrentHive());
            }
        } else if (this.currentTab.indexOf('hourly') != -1) {
            if (this.recordService.currentIdHive != this.rucheService.getCurrentHive()) {
                this.recordService.getHourlyByHive(this.rucheService.getCurrentHive())
                .subscribe(
                    (record) => {
                        console.log(record);
                        this.recordService.mergeOptionHourly = record;
                    }
                );
            }
        } else if (this.currentTab.indexOf('health') != -1) {
            this.dailyRecordThService.getByIdHive(this.rucheService.getCurrentHive());
        } else if (this.currentTab.indexOf('stack') != -1) {
            if (this.recordService.currentIdHive != this.rucheService.getCurrentHive()) {
                this.recordService.setRange(this.range);
                this.recordService.getRecordByIdHive(this.rucheService.getCurrentHive(), this.hiveSelect.name, this.merge, true)
                .subscribe(
                    (record) => {
                        console.log(record);
                        this.recordService.mergeOptionStack = record;
                        if (switchHive) {
                            this.updateEchartInstance();
                        }
                    }
                );
            }
        }
        console.log(this.hiveSelect);
    }

    ngOnDestroy() {
        //this.rucheService.hiveSubject.unsubscribe();
        //this.observationService.obsHiveSubject.unsubscribe();
        //this.observationService.obsApiarySubject.unsubscribe();
    }

}
