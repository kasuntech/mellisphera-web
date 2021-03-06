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
import { Socket } from 'ngx-socket-io';
import { JwtResponse } from '../../_model/jwt-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
    this.resultLoadDataRequest();
    //this.resSendMail();
    }

  resultLoadDataRequest() {
    this.socket.fromEvent('resRequest').subscribe(
      _res => {
        console.log(_res);
      }
    );
  }

  loadDataRequest(userId: string) {
    this.socket.emit('loaData', userId);
  }

  sendMailTest(userId: string) {
    this.socket.emit('sendTestMail', userId);
  }

  resSendMail(): Observable<any>{
    return this.socket.fromEvent('mailSend');
  }
}
