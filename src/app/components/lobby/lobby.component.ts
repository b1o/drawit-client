import { SocketService } from './../../services/socket.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/user/auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../../animations/routerTransition';
import { RoomsService } from '../../services/chat-rooms/chat-rooms.serivce';

@Component({
    selector: 'lobby',
    templateUrl: './lobby.component.html',
    animations: [
        slideInDownAnimation
    ]
})
export class LobbyComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';

    private socket: SocketIOClient.Socket = this.socketService.getSocket()
    public rooms = [];


    constructor(private authService: AuthService, private router: Router, private socketService: SocketService, private roomService: RoomsService) { }


    ngOnInit() {
        if (!this.authService.user) {
            this.router.navigateByUrl('register')
        }
        this.roomService.gotRooms.subscribe(
            data => {
                this.rooms = data;
            }
        )
        this.onUpdateRooms()
    }

    public joinRoom(name) {
        this.roomService.joinRoom(name)
    }

    public createRoom(name) {
        console.log(name)
        this.roomService.createRoom(name);
    }


    private onUpdateRooms() {
        this.socket.on('update:rooms', (data) => {
            console.log('update rooms', data)
            this.rooms = data;
        })
    }

}