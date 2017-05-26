import { slideInDownAnimation } from './../../animations/routerTransition';
import { AuthService } from './../../services/user/auth.service';
import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    animations: [
        slideInDownAnimation
    ],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    public name: string;
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        if (this.authService.user) {
            this.router.navigateByUrl('/lobby');
        }

        this.authService.registerSuccess.subscribe(
            () => {
                this.router.navigateByUrl('lobby')
            }
        )
    }

    public register() {
        this.authService.setUser(this.name);
    }
}