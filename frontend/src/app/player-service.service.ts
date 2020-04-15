import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class PlayerServiceService {

  constructor(private http: HttpClient) { }

  getAllPlayers() {
    return this.http.get('http://localhost:3333');
  }

  insertPlayer(player: any){
    // console.log(player)
    return this.http.post('http://localhost:3333/', player);
  }

  putPlayer(player: any){
    // console.log(player)
    return this.http.put('http://localhost:3333/', player);
  }

  deletePlayer(player: any) {
    // console.log(player)

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: player.id,
        name: player.name,
      },
    };

    return this.http.delete('http://localhost:3333/', options);
  }
}