import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import * as io from 'socket.io-client';
import { Http } from '@angular/http';
import { SocketService } from '../socket.service';

@Injectable()
export class ChatService {
    private url = "http://localhost:3000/";
    private socket;

    constructor(private http: Http, private socketService: SocketService) {
        this.socket = this.socketService.getSocket()
    }

    public sendMessage(from, message) {
        this.socket.emit('add-message', { message, from })
    }
    public getMessage() {
        let obs = new Observable(observer => {
            this.socket.on('message', (data) => {
                observer.next(data)
            })
            return () => {
                this.socket.disconnect()
            }
        })
        return obs;
    }
}