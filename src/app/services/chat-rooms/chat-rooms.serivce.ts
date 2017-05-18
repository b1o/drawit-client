import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { SocketService } from '../socket.service';

@Injectable()
export class RoomsService {
    public socket;

    constructor(private http: Http, private socketService: SocketService) {
        this.socket = this.socketService.getSocket()

    }

    public getChatRooms() {
        return this.http.get(environment.server + 'rooms');
    }

    public createRoom(name) {
        this.socket.emit('room:create', {name});
    }

    public getAllUsers() {
        return this.http.get(environment.server + 'users');
    }

    public onRoomCreated() {
        let obs = new Observable(observer => {
            this.socket.on('room:created', (data) => {
                observer.next(data)
            })
            return () => {
                this.socket.disconnect()
            }
        })
        return obs;
    }

    public onRoomClosed() {
        let obs = new Observable(observer => {
            this.socket.on('room:closed', (data) => {
                observer.next(data)
            })
            return () => {
                this.socket.disconnect()
            }
        })
        return obs;
    }
}