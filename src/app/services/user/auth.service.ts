import { Injectable, EventEmitter } from '@angular/core';
import { SocketService } from '../socket.service';

@Injectable()
export class AuthService {
    private username;
    private socket;
    private id;
    public user;
    public onUsers = new EventEmitter()

    constructor(private socketService: SocketService) {
        this.socket = this.socketService.getSocket()
    }

    public setUser(user) {
        this.username = user;
        let self = this;
        this.socket.emit('user:new', { name: user}, function(data) {
            self.user = data.me;
           self.onUsers.emit(data)
        })

    }

    public getUsers() {
       return this.socket.emit('get:users', {}, (data) => {
            return data;
        })
    }

    public getUser() {
        return this.username;
    }

}