import { AuthService } from './../../services/user/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket.service';

declare var $;

@Component({
    selector: 'game',
    templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
    @ViewChild('canvas') canvas;
    @ViewChild('container') container;
    roomName = 'Lobby';
    context: CanvasRenderingContext2D;
    public current = {
        color: 'black',
        x: 0,
        y: 0
    }
    isDrawing = false;
    public socket;

    constructor(private socketService: SocketService, private authService: AuthService) {

    }

    public onMouseDown(event: MouseEvent) {
        this.isDrawing = true;
        let cursor = this.getMousePos(event);
        this.current.x = cursor.x;
        this.current.y = cursor.y;
        console.log('mouse down', this.current)
    }

    public onMouseMove(event: MouseEvent) {
        if (!this.isDrawing) {
            return;
        };
        let cursor = this.getMousePos(event);

        this.drawLine(this.current.x, this.current.y, cursor.x, cursor.y, 'black', true);
        this.current.x = cursor.x;
        this.current.y = cursor.y;
        console.log('mouse move', this.isDrawing)
    }

    public onMouseUp(event: MouseEvent) {
        if (!this.isDrawing) {
            return;
        }
        let cursor = this.getMousePos(event);

        this.isDrawing = false;
        this.drawLine(this.current.x, this.current.y, cursor.x, cursor.y, 'black', true);
        console.log('mouse up', this.isDrawing)

    }

    private getMousePos(event) {
        let rect = this.canvas.nativeElement.getBoundingClientRect()
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return { x, y }
    }

    private drawLine(x0, y0, x1, y1, color, emit) {
        console.log('drawing line')
        this.context.beginPath()
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);

        this.context.stroke();
        var w = this.canvas.nativeElement.width;
        var h = this.canvas.nativeElement.height;

        if(!emit) {
            return;
        }

        this.socket.emit('drawing', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
        });
    }

    public onDrawingEvent(data) {
        console.log(data)
        var w = this.canvas.nativeElement.width;
        var h = this.canvas.nativeElement.height;
        this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, false);
    }

    ngOnInit() {
        this.context = this.canvas.nativeElement.getContext('2d');
        this.socket = this.socketService.getSocket()
        this.socket.on('drawing', this.onDrawingEvent.bind(this))
        console.log(this.canvas.nativeElement.offsetWidth, this.canvas.nativeElement.offsetHeight)
    }

}