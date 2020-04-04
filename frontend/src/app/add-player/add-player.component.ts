import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../player-service.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  inputName: string; inputCountry: string;  inputPosition: string;  inputRole: string;

  player: {
    name: string,  
    position: string,
    country: string,
    role: string
  };

  newPlayer: any;
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

  constructor(private playerService: PlayerServiceService,) { 
    this.newPlayer = '';
    this.players = [];
  }

  show() {
    console.log(this.players)
    this.playerService.getAllPlayers()
      .subscribe(response => this.players = <any> response)
  }

  addPlayer(event) {
    this.player = {
      name: this.inputName,
      position: this.inputPosition,
      country: this.inputCountry,
      role: this.inputRole
    }

    this.playerService.insertPlayer(this.player)
      .subscribe(() => {
        this.players.push(this.player);
        this.newPlayer = '';
        this.show();
        event.preventDefault();
    },
      errorResponse => {

        let msg = 'Unexpected Error';

        if(errorResponse.error.message) {
          msg = errorResponse.error.message;
        }

        console.log(msg)

      });
  };

  deletePlayer(index) {

    console.log(index)

    this.playerService.deletePlayer(index)
      .subscribe(() => {
        this.show();
  },
    errorResponse => {

      let msg = 'Unexpected Error';

      if(errorResponse.error.message) {
        msg = errorResponse.error.message;
      }

      console.log(msg)

    });
  }

  ngOnInit() {
    this.show();
  }

}
