import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {
    private socket;

    constructor() {
        if (!this.socket) {
            this.socket = io(environment.server)

        }
    }

    public getSocket() {
        return this.socket;
    }
}