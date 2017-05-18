import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/chat-rooms/chat-rooms.serivce';
import { AuthService } from '../../services/user/auth.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    public rooms = [];

    constructor(private roomService: RoomsService, private authService: AuthService) {


    }

    public createRoom(name) {
        console.log(name)
        this.roomService.createRoom(name);
    }

    public closeRoom(id) {
        for(let i = 0; i < this.rooms.length; i++) {
            let room = this.rooms[i];
            if(room.id == id) {
                this.rooms.splice(i, 1);
            }
        }
    }

    public getUsers() {
        this.roomService.getAllUsers().subscribe(
            (data) => {
                console.log(data)
            }
        )
    }

    public getRooms() {
        this.roomService.getChatRooms().subscribe(
            (data) => {
                console.log(data.json())
                this.rooms = data.json()
            }
        )
    }

    ngOnInit() {
        this.getRooms()

        this.roomService.onRoomCreated().subscribe(
            (data) => {
                this.rooms.push(data);
                console.log(this.rooms);
            }
        )

        this.roomService.onRoomClosed().subscribe(
            (roomId) => {
                this.closeRoom(roomId)
            }
        )
    }
}