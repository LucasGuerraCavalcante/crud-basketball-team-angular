import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../player-service.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  inputName: string; inputCountry: string;  inputPosition: string;  inputRole: string;
  id: number; updateName: string; updateCountry: string;  updatePosition: string;  updateRole: string; updateStatus: string;

  player: {
    name: string,  
    position: string,
    country: string,
    role: string
  };

  editPlayer: {
    id: number,
    name: string,  
    position: string,
    country: string,
    role: string,
    status: string
  };

  players: any = [];

  update: boolean;

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
    this.players = [];
  };

  show() {
    // console.log(this.players)
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
      .subscribe(() => {
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

  deletePlayer(id) {

    // console.log(player)

    this.playerService.deletePlayer(id)
      .subscribe(() => {
        this.update = false;
        this.show();
  },
    errorResponse => {

      let msg = 'Unexpected Error';

      if(errorResponse.error.message) {
        msg = errorResponse.error.message;
      }

      console.log(msg)

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

    console.log(this.editPlayer)

    this.playerService.putPlayer(this.editPlayer)
      .subscribe(() => {
        this.update = false;
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
      // console.log(this.editPlayer)
    }
  };

  ngOnInit() {
    this.show();
    this.update = false;
  };

}
