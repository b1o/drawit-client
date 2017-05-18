import { Component, OnInit, EventEmitter } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/user/auth.service'

declare var $;
import * as io from 'socket.io-client';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
    private connection;
    public messages = [];


    constructor(private chatService: ChatService, private authService: AuthService) {

    }

    sendMessage(message) {
        this.chatService.sendMessage(this.authService.getUser(), message);
    }

    ngOnInit() {


        this.connection = this.chatService.getMessage().subscribe(
            (data) => {
                this.messages.push(data)
            }
        )
    }
}