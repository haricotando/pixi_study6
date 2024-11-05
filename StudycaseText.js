import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './Utils.js';

export class StudycaseText extends PIXI.Container {

    constructor() {
        super();

        const text = 'COMA';
        // テキストスタイルを設定（グラデーション風の色をfillに直接指定）
        const textStyle = new PIXI.TextStyle({

            fontFamily     : 'Inter',
            fontSize       : 240,
            fontWeight     : 800,
            // fill           : [0xE7E0E0, 0xD3CDCD],

            // fill: ["#ffffff", "#00FFFF"], // グラデーション風に白から灰色へ
              fill: ["#ffffff", "#efefef"], // グラデーション風に白から灰色へ
            align: "center",
            fillGradientType: 0, // 垂直グラデーション
            fillGradientStops: [0.3, 0.9, 1], // グラデーションの位置
        });

        // メインテキスト
        const glowText = new PIXI.Text(text, textStyle);
        this.addChild(glowText);
        glowText.anchor.set(0.5);

        const mainText = new PIXI.Text(text, textStyle);
        mainText.anchor.set(0.5);
        mainText.x = 0;
        mainText.y = 0;

        // 影を追加
        const shadowTextStyle = Utils.cloneTextStyle(textStyle);
        const shadowDepth = 40;
        for (let i = 0; i < shadowDepth; i++) {
        const shadowText = new PIXI.Text(text, shadowTextStyle);
        shadowText.anchor.set(0.5);
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
            alpha: 1,
            blur:4,
            offset: {x:4, y:-4},
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