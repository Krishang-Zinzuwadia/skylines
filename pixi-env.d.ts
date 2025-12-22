import 'react';
import { Graphics as PixiGraphics, Container as PixiContainer } from 'pixi.js';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            graphics: any; // Using any to avoid complex prop matching for now
            container: any;
        }
    }
}
