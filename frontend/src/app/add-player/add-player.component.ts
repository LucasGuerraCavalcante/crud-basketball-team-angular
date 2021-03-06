import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators'; 
import { throwError } from 'rxjs';

import { PlayerServiceService } from '../player-service.service';
@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  inputName: string; inputCountry: string;  inputPosition: string;  inputRole: string;

  // new player input object
  player: {
    name: string,  
    position: string,
    country: string,
    role: string
  };

  id: number; updateName: string; updateCountry: string;  updatePosition: string;  updateRole: string; updateStatus: string;

  // update player input object
  editPlayer: {
    id: number,
    name: string,  
    position: string,
    country: string,
    role: string,
    status: string
  };

  responseMessage: any;
  statusColor: string;
  update: boolean;

  // team list
  players: any = [];

  playesCountryOptions: any[] = [
    {"name": "United States","acronym": "us"},
    {"name": "Spain","acronym": "es"},    
    {"name": "Australia","acronym": "au"},    
    {"name": "Argentina","acronym": "ar"},
    {"name": "France","acronym": "fr"},
    {"name": "Serbia","acronym": "rs"},
    {"name": "Greece","acronym": "gr"},
    {"name": "Lithuania","acronym": "lt"},
    {"name": "Czechia","acronym": "cz"},
    {"name": "Brazil","acronym": "br"},
    {"name": "Italy","acronym": "it"},
    {"name": "China","acronym": "cn"}
  ];

  playesPositionOptions: any[] = [
    {"name": "Point guard","acronym": "PG"},
    {"name": "Shooting guard","acronym": "SG"},    
    {"name": "Small forward","acronym": "SF"},    
    {"name": "Center","acronym": "C"}
  ];

  playesRoleOptions: any[] = [ "Captain", "Starter", "Reserver" ];

  playesStatusOptions: any[] = [ "Active", "Injured", "Unavailable" ];

  constructor(private playerService: PlayerServiceService) { 
    this.players = [];
  };

  // get all players
  show() {
    this.playerService.getAllPlayers()
      .subscribe(response => this.players = <any> response)
  };

  addPlayer(event) {
    this.player = {
      name: this.inputName,
      position: this.inputPosition,
      country: this.inputCountry,
      role: this.inputRole
    };

    this.playerService.insertPlayer(this.player)
      .pipe(
        catchError(err => {
          this.responseMessage = <any> err.error;  
          this.statusColor = "errorColor";
          return throwError(err);  
        })
      )
      .subscribe((response) => {
        this.responseMessage = <any> response;     
        this.statusColor = "okColor";
        this.show();
        event.preventDefault();
      })
  };

  deletePlayer(id) {
    this.playerService.deletePlayer(id)
      .pipe(
        catchError(err => {
          this.responseMessage = <any> err.error;  
          this.statusColor = "errorColor";
          return throwError(err);  
        })
      )
      .subscribe((response) => {
        this.responseMessage = <any> response;
        this.statusColor = "okColor";
        this.update = false;
        this.show();
    });
  };

  updatePlayer(event) {
    this.id = this.editPlayer.id

    this.editPlayer = {
      id: this.id,
      name: this.updateName,  
      position: this.updatePosition,
      country: this.updateCountry,
      role: this.updateRole,
      status: this.updateStatus
    };

    this.playerService.putPlayer(this.editPlayer)
      .pipe(
        catchError(err => {
          this.responseMessage = <any> err.error;  
          this.statusColor = "errorColor";
          return throwError(err);  
        })
      )
      .subscribe((response) => {
        this.responseMessage = <any> response;
        this.statusColor = "okColor";
        this.update = false;
        this.show();
        event.preventDefault();
    });
  };

  // render and send to the update area
  updateArea(player){
    if (this.update == true){
      this.update = false;

    } else {
      this.update = true;
      this.editPlayer = player;
      this.updateName = this.editPlayer.name 
      this.updatePosition = this.editPlayer.position 
      this.updateCountry = this.editPlayer.country 
      this.updateRole = this.editPlayer.role 
      this.updateStatus = this.editPlayer.status 
    }
  };

  ngOnInit() {
    this.show();
    this.update = false;
    this.responseMessage = { clientMessage: "Fill the form to add a new player" }
  };

}
