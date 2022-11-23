import { Component, OnInit } from '@angular/core';
import { IChannel, ITeam } from '../app.component';

@Component({
  selector: 'team-list',
  templateUrl: './teamList.component.html',
  styleUrls: ['./teamList.component.scss']
})
export class TeamList implements OnInit {

  channels: IChannel[]= [];
  disableTeamBtn : boolean = true;

  teams: ITeam[] = [];
  component: ITeam;
  newTeam: any;

  constructor() {
    this.teams.push({
      name: 'Team1',
      channels: [{
        name: 'Channel1',
        index: 1
      },
      {
        name: 'Channel2',
        index: 2
      }]
    });
    this.teams.push({
      name: 'Team2',
      channels: [{
        name: 'Channel1',
        index: 1
      },
      {
        name: 'Channel2',
        index: 2
      }]
    });
  }

  ngOnInit() {
  }

  addTeam(newTeam) {
    this.teams.push({
      name: newTeam,
      channels: []
    });
    this.newTeam = '';
  }

  addChannel(channelName, teamIndex) {
   console.log(channelName, teamIndex)
   let indexval = this.teams[teamIndex].channels.length -1
   this.teams[teamIndex].channels.push({
    name:channelName,
    index:indexval 
   })
   console.log(this.teams)
  }

  removeChannel(channelIndex, teamIndex) {
    console.log(channelIndex, teamIndex)
    this.teams[teamIndex].channels.splice(channelIndex,1)
  }

  uniqueTeamName(){
    let findUniqueValue = this.teams.find(v=>(v.name.trim()).toLowerCase()==(this.newTeam.trim()).toLowerCase())
  if(findUniqueValue){
    this.disableTeamBtn = true
  } else {
    this.disableTeamBtn = false
  }
  }
}
