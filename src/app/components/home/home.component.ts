import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/chat-rooms/chat-rooms.serivce';
import { AuthService } from '../../services/user/auth.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    public rooms = [];

    constructor(private roomService: RoomsService, public authService: AuthService, private router: Router) {


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

    public join(name:string) {
        this.roomService.joinRoom(name)
    }

    ngOnInit() {
        this.authService.onRooms.subscribe(
            (data) => {
                this.rooms = data;
                console.log(data)
            }
        )

        this.roomService.listenForUsers().subscribe(
            (data) => {
                console.log(data)
            }
        )

        this.roomService.onUpdateRoom().subscribe(
            (data:any) => {
                console.log(data)
                let room = this.rooms.find((room) => {
                    return room.name == data.name;
                })

               if(!room) {
                   this.rooms.push(data)
               }
            }
        )

        this.roomService.onUpdateRooms().subscribe(
            (data:any) => {
                this.rooms = data;
                console.log('on rooms',data);
            }
        )

        this.roomService.onRoomClosed().subscribe(
            (roomId) => {
                this.closeRoom(roomId)
            }
        )
    }
}