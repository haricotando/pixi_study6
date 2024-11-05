import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './Utils.js';

export class StudycaseText2 extends PIXI.Container {

    constructor(text = ' COMA ') {
        super();
        
        this.y = -300;
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
        
        this.shadows.y = 10;

        const dropShadowFilter = new PIXI.filters.DropShadowFilter({
            color : 0x000000,
            alpha : 0.5,
            blur  : 4,
            offset: {x:-4, y:8},
            shadowOnly: true,
        });
        
        dropshadowText.filters = [dropShadowFilter];
        
        const glowFilter = new PIXI.filters.DropShadowFilter({
            color : 0xFFFFFF,
            alpha : 0.9,
            blur  : 4,
            offset: {x:4, y:-8},
            // quality: 0.1
            shadowOnly: true,
        });
        glowText.filters = [glowFilter];

        // this.sideFace.visible  = false;
        // dropshadowText.visible = false;
        // this.shadows.visible   = false;
        // mainText.visible       = false;

        /**
         * ドロップシャドウによるGlow
         */
        // glowStyle.dropShadow         = true;
        // glowStyle.dropShadowColor    = 0xFFFFFF;
        // textStyle.dropShadowAlpha    = 0.5;
        // glowStyle.dropShadowBlur     = 8;
        // glowStyle.dropShadowAngle    = Math.PI / 1.5;
        // glowStyle.dropShadowDistance = -8;

        /**
         * ドロップシャドウ
         */
        // dropshadowStyle.dropShadow         = true;
        // dropshadowStyle.dropShadowColor    = 0x000000;
        // dropshadowStyle.dropShadowAlpha    = 0.5;
        // dropshadowStyle.dropShadowBlur     = 8;
        // dropshadowStyle.dropShadowAngle    = Math.PI / 1.5;
        // dropshadowStyle.dropShadowDistance = 8;
    }



    oldconstructor() {
        // super();








        this.x = -390;
        const text = 'COMA';
        // テキストスタイルを設定（グラデーション風の色をfillに直接指定）
        const textStyle = new PIXI.TextStyle({

            fontFamily     : 'Inter',
            fontSize       : 240,
            fontWeight     : 800,
            // fill           : [0xE7E0E0, 0xD3CDCD],

            // fill: ["#ffffff", "#00FFFF"], // グラデーション風に白から灰色へ
              fill: ["#ffffff", "#efefef"], // グラデーション風に白から灰色へ
            //   fill: ["#E7E0E0", "#D3CDCD"], // グラデーション風に白から灰色へ
            align: "center",
            fillGradientType: 0, // 垂直グラデーション
            fillGradientStops: [0.3, 0.9, 1], // グラデーションの位置
        });

        // メインテキスト
        const glowText = new PIXI.Text(text, textStyle);
        this.addChild(glowText);
        // glowText.anchor.set(0.5);

        const mainText = new PIXI.Text(text, textStyle);
        // mainText.anchor.set(0.5);
        mainText.x = 0;
        mainText.y = 0;

        // 影を追加
        const shadowTextStyle = Utils.cloneTextStyle(textStyle);
        const shadowDepth = 40;
        for (let i = 0; i < shadowDepth; i++) {
        const shadowText = new PIXI.Text(text, shadowTextStyle);
        // shadowText.anchor.set(0.5);
        shadowText.x = mainText.x - i * 1.5;
        shadowText.y = mainText.y + i * 1.5;
        shadowText.tint = 0x888888; // 暗めの影
        shadowText.alpha = ((shadowDepth - i) / shadowDepth) * 0.2;
        // shadowText.visible = false;
        this.addChild(shadowText);
        }

        this.addChild(mainText);

        const glowFilter = new PIXI.filters.DropShadowFilter({
            color: 0xFFFFFF,
            alpha: 0.9,
            blur:8,
            offset: {x:8, y:-8},
            shadowOnly: true,
        });
        glowText.filters = [glowFilter];

        const dropShadowFilter = new PIXI.filters.DropShadowFilter({
            color: 0x000000, // シャドウの色
            alpha: 0.25, // シャドウの透明度
            // blur: 2, // ぼかしの強さ
            // offset: {x:0, y:8}
        });
        
        mainText.filters = [dropShadowFilter];


        // textStyle.dropShadow = true;
        // textStyle.dropShadowAlpha = 1;
        // textStyle.dropShadowColor = 0xFFFFFF;
        // textStyle.dropShadowBlur = 4;
        // textStyle.dropShadowDistance = -16;
        // textStyle.dropShadowAngle = Math.PI / 2;

    }
}