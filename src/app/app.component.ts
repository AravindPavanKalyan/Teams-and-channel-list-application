import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Teams and Channels List';
}

export interface ITeam {
  channels: IChannel[];
  name: String
}

export interface IChannel {
  name: string;
  index: number;
}

