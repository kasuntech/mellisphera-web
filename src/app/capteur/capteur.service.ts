import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { CONFIG } from '../../config';
import { Capteur } from './capteur';
import { Rucher } from '../ruche-rucher/rucher';
import { CapteurInterface } from '../_model/capteur';
import { UserloggedService } from '../userlogged.service';
import { stringify } from '@angular/core/src/util';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class CapteurService {
 
    capteur : CapteurInterface;
    capteurs : CapteurInterface[];
    capteursByUser : CapteurInterface[];
    capteurAcheter : CapteurInterface[];
    capteursType:Object;
    capteurObs : Observable<CapteurInterface>;
    capteursObs : Observable<CapteurInterface[]>;
    constructor(private http:HttpClient, private user : UserloggedService) {
        //this.getCapteurs();
        this.getUserCapteurs();
        this.capteursType =
            [
                {'reference' : '41', 'type' : 'T2'},
                {'reference' : '42', 'type' : 'T_HR'},
                {'reference' : '43', 'type' : 'WEIGHT'}

            ];
        //this.getSoldDevicesByUser();
        this.initCapteur();
    }

    initCapteur(){
        this.capteur = { 
            id : null,
            reference : '',
            name : '',
            type : '' ,
            description : '',
            username: '',
            idHive: '',
            idApiary: '',
            hiveName: '',
            apiaryName:''
        }
    }
 
    // pour créer un capteur
    createCapteur() {
        this.capteurObs = this.http.post<CapteurInterface>(CONFIG.URL+'sensors', this.capteur,httpOptions)
        this.capteurObs.subscribe(
            ()=>{},
            (err)=>{
                console.log(err);
            },
            ()=>{
                this.getUserCapteurs();
            }
        );
    }

    //get all sensors 
    getCapteurs(){
        this.capteursObs = this.http.get<CapteurInterface[]>(CONFIG.URL+'sensors/all')
        this.capteursObs.subscribe(
            (data)=>{
                this.capteurs = data;
                this.capteur = data[0];
            },
            (err)=>{
                console.log(err);
            }
        );
    }

    getSoldDevicesByUser() {
        this.capteursObs = this.http.get<CapteurInterface[]>(CONFIG.URL+'sold_devices/username/'+ this.user.getUser());
        this.capteursObs.subscribe(
            (data)=>{
                console.log(data);
                this.capteurAcheter = data;
            },
            (err)=>{
                console.log(err);
            }
        );
    }

    getUserCapteurs() {
        this.capteursObs = this.http.get<CapteurInterface[]>(CONFIG.URL+'sensors/'+ this.user.getUser());
        this.capteursObs.subscribe(
            (data) => {
                this.capteursByUser = data;
                console.log(this.capteursByUser);
            },
            (err) => {
                console.log(err);
            },
        );
    }

    deleteCapteur() {
        this.capteurObs = this.http.delete<CapteurInterface>(CONFIG.URL+'sensors/' + this.capteur.id);
        this.capteurObs.subscribe(
            () => {},
            (err) => {
                console.log(err);
            },
            () => {
                this.getUserCapteurs();
            }
        );
    }

    checkSensorExist(reference: string): Observable<Boolean>{
        return this.http.get<CapteurInterface>(CONFIG.URL + 'sensors/check/' + reference)
        /* Test si le captuer exist (map sur le resultat de la requete*/
        .map(res => res.reference !== reference);
    }
    updateCapteur() {
        this.capteurObs =  this.http.put<CapteurInterface>(CONFIG.URL+ 'sensors/update/' + this.capteur.id, this.capteur, httpOptions);
        this.capteurObs.subscribe(
            () => {},
            (err) => {
                console.log(err);
            },
            () => {
                this.getUserCapteurs();
            }
        );
    }
}