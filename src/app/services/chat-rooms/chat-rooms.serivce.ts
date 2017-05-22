import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { SocketService } from '../socket.service';
import { AuthService } from '../user/auth.service';

@Injectable()
export class RoomsService {
    public socket;
    public currentRoom;

    constructor(private http: Http, private socketService: SocketService, private authService: AuthService) {
        this.socket = this.socketService.getSocket()

    }

    public getChatRooms() {
        return this.http.get(environment.server + 'rooms');
    }

    public createRoom(name) {
        this.socket.emit('room:new', {name});
    }

    public getAllUsers() {
        return this.http.get(environment.server + 'users');
    }
    
    public joinRoom(name) {
        this.currentRoom = name;
        this.socket.emit('user:joined', {
            room: name,
            user: this.authService.getUser()
        })
    }

    public listenForUsers() {
        let obs = new Observable(observer => {
            this.socket.on('update:users', (data) => {
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        })

        return obs;
    }

    public onUpdateRooms() {
        let obs = new Observable(observer => {
            this.socket.on('update:room', (data) => {
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