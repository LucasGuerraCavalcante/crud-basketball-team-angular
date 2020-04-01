import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  inputName: string; inputCountry: string;  inputPosition: string; 

  player: {
    name: string,  
    position: string,
    country: string
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
  ]

  constructor() { 
    this.newPlayer = '';
    this.players = [];
  }

  addPlayer(event) {
    this.player = {
      name: this.inputName,
      position: this.inputPosition,
      country: this.inputCountry
    }
    this.players.push(this.player);
    this.newPlayer = '';
    event.preventDefault();
  }

  deletePlayer(index) {
    this.players.splice(index, 1);
  }

  ngOnInit() {
  }

}
