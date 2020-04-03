import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient } from '@angular/common/http'

export interface Player {
  name: string
}

@Injectable(

)
export class PlayerServiceService {

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>('http://localhost:3333')
  }

  insertPlayer(Player: Player): Observable<Player> {
    return this.http.post<Player>('http://localhost:3333/', Player)
  }

  deletePlayer(id: number) {
    return this.http.delete('http://localhost:3333/' + id)
  }
}