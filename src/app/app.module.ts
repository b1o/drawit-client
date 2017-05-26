import { LobbyComponent } from './components/lobby/lobby.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component'
import { HomeComponent } from './components/home/home.component'

import { ChatService } from './services/chat/chat.service'
import { AuthService } from './services/user/auth.service'
import { RouterModule } from "@angular/router";
import { routes } from "app/app.routes";
import { PageNotFoundComponent } from "app/components/not-found/not-found.component";
import { RoomsService } from './services/chat-rooms/chat-rooms.serivce';

import { MdlModule } from '@angular-mdl/core';
import { MdlExpansionPanelModule } from '@angular-mdl/expansion-panel';
import { SocketService } from './services/socket.service';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdlModule,
    MdlExpansionPanelModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    ChatService,
    AuthService,
    RoomsService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
