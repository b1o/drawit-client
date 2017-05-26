import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideInAnimation: AnimationEntryMetadata =
  trigger('chat', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0%)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-50%)'
        
      }),
      animate('0.5s ease-in')
    ])
 
  ]);