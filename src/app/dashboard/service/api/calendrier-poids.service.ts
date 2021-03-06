/* Copyright 2018-present Mellisphera
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { Injectable } from '@angular/core';
import { MyDate } from '../../../class/MyDate';
import { UnitService } from '../unit.service';
import { GraphGlobal } from '../../graph-echarts/GlobalGraph';

@Injectable({
    providedIn: 'root'
})
export class CalendrierPoidsService {

    constructor(private unitService: UnitService, private graphGlobal: GraphGlobal) {
    }

    option = {
        //backgroundColor: 'white',
        title: {
            top: 5,
            text: this.graphGlobal.getTitle("DailyWeightIncomes"),
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: (params: any) => {
                return params.marker + this.unitService.getDailyDate(params.data[0].split('T')[0]) + 
                '<br/>' + params.seriesName + ' : ' + this.graphGlobal.getNumberFormat(this.unitService.getValRound(params.data[1])) + ' ' + this.graphGlobal.weight.unitW;
            }
        },
        toolbox: {
            orient: 'vertical',
            itemSize: 15,
            top: 'middle',
            feature: {
                dataView: {
                    show: true,
                    readOnly: true,
                    optionToContent: function (opt) {
                        var series = opt.series;
                        //var table = '<table style="width:100%;">';
                        var table = '<textarea style="width:100%; height:500px;" >'
                        table += series[0].name + '\n';
                        let data;
                        series[0].data.forEach(element => {
                            table += MyDate.getIsoFromDate(MyDate.getWekitDate(element[0])) + ' => ' + element[1] + '\n';
                        });
                        table += series[1].name + '\n';
                        series[1].data.forEach(element => {
                            table += MyDate.getIsoFromDate(new Date(element[1])) + ' => ' + element[1] + '\n';
                        });
                        table += '</textarea>';
                        return table;
                    }
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            top: 30,
            data: ['gain', this.graphGlobal.getTitle("loss")],
            textStyle: {
                color: 'black'
            }
        },
        calendar: [{
            top: 100,
            left: '3%',
            right: '2%',
            width: '92%',
            //right: '4%',
            height: '45%',
            //height:'auto',
            cellSize: ['20', '20'],
            range: MyDate.getRangeForCalendar(),
            orient: 'horizontal',
            /*cellSize: 'auto',
            height:'200',*/
            //  width:'95%',
            // top:70,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#000',
                    width: 4,
                    type: 'solid'
                }
            },
            dayLabel: {
                nameMap: this.graphGlobal.getDays(),
                firstDay: 1, // start on Monday
            },
            monthLabel: {
                nameMap: this.graphGlobal.getMonth()
            },
            yearLabel: {
                formatter: '{start}-{end}',
                show: false,
                margin: 40,
                textStyle: {
                    color: 'black'
                }
            },
            itemStyle: {
                normal: {
                    color: '#EBEBEB',
                    borderWidth: 1,
                    borderColor: '#111'
                }
            }
        }],
        series: [
            {
                name: 'gain',
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                data: '',
                symbolSize: (val: Array<any>) => {
                    if (val[1] >= 0) {
                        if (this.unitService.getUserPref().unitSystem === 'METRIC') {
                            return (0.5 * Math.sqrt((1000 * val[1])));
                        } else {
                            return (0.5 * Math.sqrt((1000 * val[1] * 0.45)));
                        }  
                    }
                    else { return 0; }
                },
                showEffectOn: 'emphasis',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: '#00FE0C'
                    }
                }
            },
            {
                name: this.graphGlobal.getTitle("loss"),
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                data: '',
                symbolSize: (val: Array<any>) => {
                    if (val[1] < 0) {
                        if (this.unitService.getUserPref().unitSystem === 'METRIC') {
                            return (0.5 * Math.sqrt(Math.abs(1000 * val[1])));
                        } else {
                            return (0.5 * Math.sqrt(Math.abs(1000 * val[1] * 0.45)));
                        }  
                    }
                    else { return 0; }
                },
                showEffectOn: 'emphasis',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,

                itemStyle: {
                    normal: {
                        color: '#FE0000'

                    }
                }
            },

        ]


    };
    convertDate(date: Date) {
        var jour = '' + date.getDate();
        var mois = '' + (date.getMonth() + 1);
        var anee = date.getFullYear();
        if (parseInt(jour) < 10) { jour = '0' + jour; }
        if (parseInt(mois) < 10) { mois = '0' + mois; }

        return anee + '-' + mois + '-' + jour;
    }
}
