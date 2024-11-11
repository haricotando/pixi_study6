import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './Utils.js';

export class TitleCOMA extends PIXI.Container {

    constructor(text = '8124') {
        super();
        this.container = this.addChild(new PIXI.Container());
        this.shadows   = this.container.addChild(new PIXI.Container());
        
        /**
         * フロントフェイスText
        */
        const textStyle = new PIXI.TextStyle({
            fontFamily: 'Inter',
            fontSize  : 300,
            fontWeight: 800,
            fill      : [0xFFFFFF, 0xEFEFEF],
        //    fill             : [0xEFEFEF, 0xE7E0E0],
        //    fill             : [0xE7E0E0, 0xD3CDCD],
            align            : 'center',
            fillGradientType : 0,
            fillGradientStops: [0.3, 0.9, 1],
        });
        
        const glowStyle = Utils.cloneTextStyle(textStyle, {fill: 0xFFFFFF});
        const glowText = this.container.addChild(new PIXI.Text(text, glowStyle));
        
        const dropshadowStyle = Utils.cloneTextStyle(textStyle,  {fill: 0xFFFFFF});
        const dropshadowText = this.container.addChild(new PIXI.Text(text, dropshadowStyle));
        
        this.sideFace = this.container.addChild(new PIXI.Container());
        const mainText = new PIXI.Text(text, textStyle);
        this.container.addChild(mainText);

        Utils.pivotCenter(this.container);


        /**
         * サイドフェイス
         */
        const layers = 10;
        let sideStyle = Utils.cloneTextStyle(textStyle, {fill: 0xD4D0C8});
        let lastSide = undefined;
        // サイドフェイス幅に合わせて中心寄せ
        for (let i = 0; i < layers; i++) {
            const side = this.sideFace.addChild(new PIXI.Text(text, sideStyle));
            side.y = i * 1;
            if(lastSide){
                side.width -= 1 * i;
                side.x = i * (lastSide.width - side.width) / 2;
            }
            lastSide = side;
        }
        this.sideFace.alpha = 0.4;

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
        
        this.shadows.y = 10;

        const dropShadowFilter = new PIXI.filters.DropShadowFilter({
            color     : 0x000000,
            alpha     : 0.5,
            blur      : 4,
            quality   : 4,
            offset    : {x:-4, y:8},
            shadowOnly: true,
        });
        
        dropshadowText.filters = [dropShadowFilter];
        
        const glowFilter = new PIXI.filters.DropShadowFilter({
            color  : 0xFFFFFF,
            alpha  : 0.9,
            blur   : 4,
            quality: 4,
            offset : {x:4, y:-8},
            // quality: 0.1
            shadowOnly: true,
        });
        glowText.filters = [glowFilter];


        gsap.delayedCall(2, ()=>{
            
        });
    }

    
}