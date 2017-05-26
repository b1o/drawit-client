import { Injectable, EventEmitter } from '@angular/core';
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
    public onSwitchRoom = new EventEmitter()
    public gotUsers = new EventEmitter()
    public gotRooms = new EventEmitter();

    constructor(private http: Http, private socketService: SocketService, private authService: AuthService) {
        this.socket = this.socketService.getSocket()
        this.authService.registerSuccess.subscribe(
            () => {
                console.log('getting info')
                this.getUsers()
                this.getRooms()
            }
        )
    }

    public getChatRooms() {
        return this.http.get(environment.server + 'rooms');
    }

    public createRoom(name) {
        this.socket.emit('room:new', { name }, (data) => {
            console.log('got updated room', data)
            this.authService.user.inRoom = data.name
        });
    }

    public getUsers() {
        console.log('getting users')
        this.socket.emit('get:users', {}, (data) => {
            console.log('got users', data)
            this.gotUsers.emit(data)
        })
    }

    public getRooms() {
        console.log('getting rooms')
        this.socket.emit('get:rooms', {}, (data) => {
            console.log('got rooms', data)
            this.gotRooms.emit(data)
        })
    }

    public joinRoom(name) {
        this.currentRoom = name;
        let data = {
            room: name,
            user: this.authService.user
        }
        this.socket.emit('user:joined', data, (data) => {
            if (data) {
                this.onSwitchRoom.emit(data);
            }
        })
        console.log('trying to joing room', data)
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

    public listenForRoomUsers() {
        let obs = new Observable(observer => {
            this.socket.on('update:room-users', (data) => {
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
            this.socket.on('update:rooms', (data) => {
                observer.next(data)
            })
            return () => {
                this.socket.disconnect()
            }
        })
        return obs;
    }

    public onUpdateRoom() {
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