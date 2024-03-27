import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { stringify } from 'querystring';
import { timeEnd } from 'console';

// const GIHPY_API_KEY:string = 'http://api.giphy.com/v1/gifs/search?q=valorant&limit=10&api_key=kgT08fcO2xH3LmoChnb3wct3b0qBSBt2'


@Injectable({providedIn: 'root'})
export class GifsService {

  public giftList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'kgT08fcO2xH3LmoChnb3wct3b0qBSBt2';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    // this.loadLocalStorage();

  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){

    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory= this._tagsHistory.filter((oldTag)=> oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory) );
  }

  // private loadLocalStorage():void{

  //   if( !localStorage.getItem('history') ) return;

  //   this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

  //   if(this._tagsHistory.length>0){
  //     this.searchTag(this._tagsHistory[0]);
  //   }
  // }

  searchTag(tag: string): void {
    if(tag.length == 0 ) return;
    // this._tagsHistory.unshift(tag);
    this.organizeHistory(tag);

    // fetch('http://api.giphy.com/v1/gifs/search?q=valorant&limit%20=10&api_key=kgT08fcO2xH3LmoChnb3wct3b0qBSBt2')
    // .then(resp => resp.json())
    // .then( data => console.log(data));

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit',10)
    .set('q',tag)

    this. http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe(resp => {
      this.giftList = resp.data
      // console.log({gifs: this.giftList});
    });
  }
}
