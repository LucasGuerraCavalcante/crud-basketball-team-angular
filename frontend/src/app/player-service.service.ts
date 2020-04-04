import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class PlayerServiceService {

  constructor(private http: HttpClient) { }

  getAllPlayers() {
    return this.http.get('http://localhost:3333');
  }

  insertPlayer(player: any){
    console.log(player)
    return this.http.post('http://localhost:3333/', player);
  }

  deletePlayer(player: any) {
    console.log(player)
    return this.http.request('delete', 'http://localhost:3333/', player);
  }
}