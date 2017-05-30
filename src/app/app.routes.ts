import { LobbyComponent } from './components/lobby/lobby.component';
import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { PageNotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'chat/:room', component: ChatComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'lobby', component: LobbyComponent},
    { path: 'game', component: GameComponent},
    { path: '**', component: PageNotFoundComponent }
];

