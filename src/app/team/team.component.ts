import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ITeam } from '../app.component';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class Team implements OnInit {
  channelName: any;
  disableChannelBtn : boolean = true
  @Input() team: ITeam;
  @Input() teamIndex: number;
  @Output() newChannel: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancelChannel:  EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {
  }

  handleAddChannel() {
    this.newChannel.emit(this.channelName);
    this.channelName = ""
  }

  uniqueChannelName(){
    let findUniqueValue = this.team.channels.find(v=>(v.name.trim()).toLowerCase()==(this.channelName.trim()).toLowerCase())
  if(findUniqueValue){
    this.disableChannelBtn = true
  } else {
    this.disableChannelBtn = false
  }
  }

  removeChannel(i){
    this.cancelChannel.emit(i)
  }
}
