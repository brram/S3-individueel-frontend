import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private hubConnection: signalR.HubConnection | undefined;

  constructor() { }

  public startConnection(): Promise<string>{
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('ws://localhost:5000/sales', {
                              skipNegotiation: true,
                              transport: signalR.HttpTransportType.WebSockets
                            })
                            .build();

    return new Promise((resolve, reject) => {
      this.hubConnection?.start()
        .then(() => this.post(0))
        .catch(err => resolve('Error while starting connection: ' + err))
    });
  }

  public get(): Promise<number>{
    return new Promise((resolve, reject) => {this.hubConnection?.on('ReceiveSales', (data) => { 
      resolve(data); 
      });
    });
  }

  public post(message: number){
    this.hubConnection?.invoke("SendSalesToAll", message);
  }
}
