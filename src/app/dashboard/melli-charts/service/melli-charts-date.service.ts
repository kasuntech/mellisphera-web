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
import { DataRange } from '../../../_model/data-range';
import { MyDate } from '../../../class/MyDate';
import { ReactiveFormsModule } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class MelliChartsDateService {


  private rangeDateForRequest: Date[]; // for request
  /* Display */
  public start: Date;
  public end: Date;

  public ranges: DataRange[];
  constructor() {
    this.ranges = [
/*       { scale: 1, type: 'HOUR'},
      { scale: 6, type: 'HOURS'},
      { scale: 12, type: 'HOURS'}, */
      { scale: 1, type: 'DAY', typeFr: 'JOUR', typeEs: 'Día'},
      { scale: 3, type: 'DAY', typeFr: 'JOUR', typeEs: 'Día'},
      { scale: 7, type: 'DAY', typeFr: 'JOUR', typeEs: 'Día'},
      { scale: 15, type: 'DAY', typeFr: 'JOUR', typeEs: 'Día'},
      { scale: 1, type: 'MONTH', typeFr: 'MOIS', typeEs: 'Mes'},
      { scale: 2, type: 'MONTHs', typeFr: 'MOIS', typeEs: 'Mes'},
      { scale: 3, type: 'MONTH', typeFr: 'MOIS', typeEs: 'Mes'},
      { scale: 6, type: 'MONTH', typeFr: 'MOIS', typeEs: 'Mes'},
      { scale: 9, type: 'MONTH', typeFr: 'MOIS', typeEs: 'Mes'},
      { scale: 1, type: 'YEAR', typeFr: 'AN', typeEs: 'Año'}
    ];
    this.setRange(this.ranges[4]);
  }

  
  setRange(scale: DataRange): void {
    let date = new Date();
    switch(scale.type){
      case 'DAY':
        date.setDate((new Date().getDate() - scale.scale));
        break;
      case 'MONTH':
        date.setMonth((new Date().getMonth() - scale.scale));
        break;
      case 'YEAR':
        date.setFullYear(new Date().getFullYear() - 1);
        break;
      case 'HOUR':
        date.setHours(new Date().getHours() - scale.scale);
        break;
      default:
        date.setDate(date.getDate() - 15);
    }
    date = this.getDateBeginMonday(date);
    this.rangeDateForRequest = MyDate.getRange(date);
    console.log(this.rangeDateForRequest);
    this.rangeDateForRequest[0].setHours(0);
    this.rangeDateForRequest[0].setSeconds(0);
    this.rangeDateForRequest[1].setHours(4);
    this.rangeDateForRequest[1].setSeconds(0);
    this.start = this.rangeDateForRequest[0];
    this.end = this.rangeDateForRequest[1];
  }

  /**
   *
   *
   * @returns {Date[]}
   * @memberof MelliChartsDateService
   */
  getRangeForReqest(): Date[] {
    return this.rangeDateForRequest;
  }

  getDateBeginMonday(date: Date): Date {
    const dayInf: boolean = date.getDate() <= 6;
    while (date.getDay() !== 1) {
      if (dayInf) {
        date.setDate(date.getDate() + 1);
      } else {
        date.setDate(date.getDate() - 1);
      }
    }
    return date
  }

  getDayDiffRangeRequest() {
    const d1 = this.rangeDateForRequest[0].getTime() / 86400000;
    const d2 = this.rangeDateForRequest[1].getTime() / 86400000;
    return (d2 - d1).toFixed(0);
  }


  setRangeForRequest(_range: Date[] ) {
    const range: Date[] = [new Date(_range[0]), new Date(_range[1])];
    range[0].setHours(0);
    range[0].setMinutes(0);
    range[0].setSeconds(0);
    range[1].setHours(0);
    range[1].setMinutes(0);
    range[1].setSeconds(0);
    this.rangeDateForRequest = [range[0], range[1]];
    this.start = this.rangeDateForRequest[0];
    this.end = this.rangeDateForRequest[1];
  }

}
