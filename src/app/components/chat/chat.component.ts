import { Component, OnInit, EventEmitter, Input, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/user/auth.service'

declare var $;
import * as io from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import { RoomsService } from '../../services/chat-rooms/chat-rooms.serivce';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
    private connection;
    public messages = [];
    public users = []
    public input;
    @Input() room;
    @ViewChild('msgs') msgContainer;

    constructor(private chatService: ChatService, private authService: AuthService, private roomService: RoomsService) {

    }

    sendMessage(message, withKey) {
        if(withKey) {
            console.log(message)
        }

        this.chatService.sendMessage(this.authService.getUser(), this.input, this.onMessageSuccess.bind(this));
        this.input = "";
    }

    onMessageSuccess(data) {
        console.log(data)
        this.messages.push(data)
        $(".message-container").animate({ scrollTop: $('.message-container').prop("scrollHeight")}, 500);
    }

    ngOnInit() {
        console.log(this.authService.getUsers())

        this.authService.onUsers.subscribe(
            (data) => {
                if(data) {
                    this.users = data.users
                }
                console.log(data)
            }
        )

        this.roomService.onSwitchRoom.subscribe(
            (data) => {
                this.room = data;
            }
        )

        this.roomService.listenForUsers().subscribe(
            (data:any) => {
                console.log('got users', data)
                console.log(this.authService.user)
                this.users = data
            }
        )

        this.connection = this.chatService.getMessage().subscribe(
            (data) => {
                this.onMessageSuccess(data)
            }
        )
    }
}