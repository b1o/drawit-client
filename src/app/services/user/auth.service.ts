import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';

@Injectable()
export class AuthService {
    private username;
    private socket;
    private id;

    constructor(private socketService: SocketService) {
        this.socket = this.socketService.getSocket()
    }

    public setUser(user) {
        this.username = user;
        this.id = Math.random()
        this.socket.emit('user:created', { name: user, id: this.id })
    }

    public getUser() {
        return this.username;
    }

}