import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { User } from './account/models/User';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl: string = 'https://localhost:44367/hubs/';
  private hubConnection!: HubConnection;
  private onLineUsersSource = new BehaviorSubject<string[]>([]);

  onlineUsers$ = this.onLineUsersSource.asObservable();
  constructor() {}

  createConnectionHub(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnLine', (username) => {
      console.log(username + ' is connected');
    });

    this.hubConnection.on('UserIsOffLine', (username) => {
      console.log(username + ' is disconnected');
    });

    this.hubConnection.on('GetOnlineUsers', (userNames: string[]) => {
      this.onLineUsersSource.next(userNames);
    });
  }

  stopHubConnection() {
    this.hubConnection.stop().catch((error) => console.log(error));
  }
}
