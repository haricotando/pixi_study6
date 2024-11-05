import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './Utils.js';

export class StudycaseText extends PIXI.Container {

    constructor(text = ' COMA ') {
        super();
        
        this.container = this.addChild(new PIXI.Container());
        this.shadows   = this.container.addChild(new PIXI.Container());
        
        /**
         * フロントフェイスText
        */
       const textStyle = new PIXI.TextStyle({
           fontFamily       : 'Inter',
           fontSize         : 240,
           fontWeight       : 800,
        //    fill             : [0xEFEFEF, 0xE7E0E0],
           fill             : [0xFFFFFF, 0xEFEFEF],
           align            : 'center',
           fillGradientType : 0,
           fillGradientStops: [0.3, 0.9, 1],
           // fill           : [0xE7E0E0, 0xD3CDCD],
        });
        
        const glowStyle = Utils.cloneTextStyle(textStyle, {fill: 0xFFFFFF});
        const glowText = this.container.addChild(new PIXI.Text(text, glowStyle));
        
        const dropshadowStyle = Utils.cloneTextStyle(textStyle,  {fill: 0xFFFFFF});
        const dropshadowText = this.container.addChild(new PIXI.Text(text, dropshadowStyle));
        
        this.sideFace = this.container.addChild(new PIXI.Container());
        const mainText = new PIXI.Text(text, textStyle);
        this.container.addChild(mainText);

        // あとで消すぞーん
        // this.x = -390;
        Utils.pivotCenter(this.container);
        // あとで消すぞーん


        /**
         * サイドフェイス
         */
        const layers = 10;
        // let sideStyle = Utils.cloneTextStyle(textStyle, {fill: 0xFF0000});
        let sideStyle = Utils.cloneTextStyle(textStyle, {fill: 0x666666});
        // let sideStyle = Utils.cloneTextStyle(textStyle, {fill: 0xD4D0C8});
        let xPos = 100
        let yPos = 100;
        let lastSide = undefined;
        for (let i = 0; i < layers; i++) {
            const side = this.sideFace.addChild(new PIXI.Text(text, sideStyle));
            side.y = i * 1;
            if(lastSide){
                side.width -= 1 * i;
                side.x = i * (lastSide.width - side.width) / 2;
            }
            lastSide = side;
        }
        this.sideFace.alpha = 0.2;
        // this.sideFace.visible = false;

        /**
         * シャドウText
         */

        const shadowTextStyle = Utils.cloneTextStyle(textStyle);
        const shadowDepth = 30;

        for (let i = 0; i < shadowDepth; i++) {
            const shadowText = new PIXI.Text(text, shadowTextStyle);
            shadowText.x = mainText.x - i * 1.5;
            shadowText.y = mainText.y + i * 1.5;
            shadowText.tint = 0x888888; // 暗めの影
            shadowText.alpha = ((shadowDepth - i) / shadowDepth) * 0.2;
            this.shadows.addChild(shadowText);
        }

        for (let i = 0; i < shadowDepth; i++) {
            const shadowText = new PIXI.Text(text, shadowTextStyle);
            shadowText.x = mainText.x - i * 1.5;
            shadowText.y = mainText.y + i * 1.5 - 10;
            shadowText.tint = 0x888888; // 暗めの影
            shadowText.alpha = ((shadowDepth - i) / shadowDepth) * 0.2;
            this.shadows.addChild(shadowText);
        }
        // this.shadows.visible = false;
        this.shadows.y = 10;

        /**
         * ドロップシャドウによるGlow
         */
        glowStyle.dropShadow         = true;
        glowStyle.dropShadowColor    = 0xFFFFFF;
        textStyle.dropShadowAlpha    = 0.5;
        glowStyle.dropShadowBlur     = 8;
        glowStyle.dropShadowAngle    = Math.PI / 1.5;
        glowStyle.dropShadowDistance = -8;

        /**
         * ドロップシャドウ
         */
        dropshadowStyle.dropShadow         = true;
        dropshadowStyle.dropShadowColor    = 0x000000;
        dropshadowStyle.dropShadowAlpha    = 0.5;
        dropshadowStyle.dropShadowBlur     = 8;
        dropshadowStyle.dropShadowAngle    = Math.PI / 1.5;
        dropshadowStyle.dropShadowDistance = 8;
    }
}