import { dataProvider, dp } from "./dataProvider.js";
import GraphicsHelper from "./helper/GraphicsHelper.js";
import { OptimizedCOMA } from "./OptimizedCOMA.js";
import { TitleCOMA } from "./TitleCOMA.js";
import { UIKitToggleButton } from "./UIKitToggleButton.js";
import Utils from "./Utils.js";

export class ApplicationRoot extends PIXI.Container {
    
    constructor(debug = false) {
        super();

        /**
            * この辺までテンプレ
            * constructor -> アセット読み込み -> init
         */
        this.sortableChildren = true;
        this._debug = debug;
        this.loadAssets();
        
        if(this._debug){
            this.debugAssets = this.addChild(new PIXI.Container());
            this.debugAssets.zIndex = 1000;
            this.initSPFrame();
        }
    }
    
    /** ------------------------------------------------------------
     * アセット読み込み等完了後スタート
    */
    init(){
        const bg = this.addChild(GraphicsHelper.exDrawRect(0, 0, dp.limitedScreen.width, dp.limitedScreen.height, false, {color:0xE2DDDA}));
        Utils.pivotCenter(bg);

        
        PIXI.settings.ROUND_PIXELS = true;
        const backgroundGrid = new PIXI.TilingSprite(
            dp.assets.backgroundGrid,
            dp.limitedScreen.height * 1.2,
            dp.limitedScreen.height * 1.2,
        );
        // this.addChild(backgroundGrid);
        // Utils.pivotCenter(backgroundGrid);
        // backgroundGrid.tileScale.set(0.5);


        // const coma = this.addChild(new TitleCOMA())
        // coma.y = 300;
        const optComa = this.addChild(new OptimizedCOMA())
    }




















    initA(){
        PIXI.settings.ROUND_PIXELS = true;
        const backgroundGrid = new PIXI.TilingSprite(
            dp.assets.backgroundGrid,
            dp.limitedScreen.height * 1.2,
            dp.limitedScreen.height * 1.2,
        );
        this.addChild(backgroundGrid);
        Utils.pivotCenter(backgroundGrid);
        backgroundGrid.tileScale.set(0.5);

        // Background TL
        // backgroundGrid.tileScale.set(5);
        const tl = gsap.timeline();
        backgroundGrid.alpha = 0;
        tl.to(backgroundGrid, {alpha:1, duration:0.5, ease:'none'});
        tl.to(backgroundGrid.tileScale, {x:0.8, y:0.8, duration: 0.5, ease:'expo.out', 
            onUpdate: () => {
                backgroundGrid.tilePosition.set(
                    - backgroundGrid.width / 2 * (backgroundGrid.tileScale.x - 1),
                    - backgroundGrid.height / 2 * (backgroundGrid.tileScale.y - 1)
            );
            }
        }, '<');
        tl.to(backgroundGrid.tileScale, {x:0.4, y:0.4, duration: 0.7, ease:'expo.inOut', 
            onUpdate: () => {
                backgroundGrid.tilePosition.set(
                    - backgroundGrid.width / 2 * (backgroundGrid.tileScale.x - 1),
                    - backgroundGrid.height / 2 * (backgroundGrid.tileScale.y - 1)
            );
            }
        });
        // tl.to(backgroundGrid, {rotation: Utils.degreesToRadians(90), duration:2, ease:'back.out(1)'}, '<0.2');

        // Bulge FX
        const bulgeDefaultRadius = 0;
        const bulgeDefaultStrength = 1;
        const bulgePinchFilter = new PIXI.filters.BulgePinchFilter(
            {
                center:     [0.5, 0.5],
                radius:     bulgeDefaultRadius,
                strength:   bulgeDefaultStrength,
            }
        );
        backgroundGrid.filters = [bulgePinchFilter];
        
        const tlBulge = gsap.timeline({delay:0.1});
        tlBulge.to(bulgePinchFilter, {radius:600, duration:0.4, ease:'power.out'});
        tlBulge.to(bulgePinchFilter, {strength:-0.2, duration:0.4, ease:'power.out'}, '<');
        tlBulge.to(bulgePinchFilter, {radius:240, duration:0.3, ease:'power.inOut'});
        tlBulge.to(bulgePinchFilter, {strength:1.5, duration:0.3, ease:'power.inOut'}, '<');

        tlBulge.to(bulgePinchFilter, {radius:0, duration:1.4, ease:'expo.inIut'});
        tlBulge.to(bulgePinchFilter, {strength:0, duration:1.4, ease:'expo.inOut'}, '<');

        const hex1 = this.addChild(GraphicsHelper.drawHexagon(300, undefined, [0x666666, 1], false));
        hex1.alpha = 0;
        // hex1.rotation = Utils.degreesToRadians(-45);
        hex1.scale.set(0.1);

        const hexTL = gsap.timeline({delay:0.3});
        hexTL.to(hex1, {alpha:1, duration:0.4});
        hexTL.to(hex1.scale, {x:1, y:1, duration:0.6, ease:'back.inOut(2)'}, '<');
        // hexTL.to(hex1, {rotation:0, duration:0.5, ease:'expo.out'}, '<0.3');
        hexTL.to(hex1.scale, {x:0.8, y:0.8, duration:0.5, ease:'circ.out'});
        hexTL.to(hex1.scale, {x:0.2, y:0.2, duration:0.4, ease:'expo.out'});
        hexTL.to(hex1, {alpha:0, duration:0.3}, '<');

    }









    

    initSmoothTest(){
        const yukkuriTexture = PIXI.Texture.from('https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F2707139%2F9b86d3f7-2c11-29c2-626c-7064579101f8.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=9ee2c21091d93e2a720ebc16fc208db3');
        yukkuriTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        const yukkuri = this.addChild(new PIXI.Sprite(yukkuriTexture));
        yukkuri.scale.set(8);
        
        const bunnyTexture = PIXI.Texture.from('https://pixijs.com/assets/bunny.png');
        bunnyTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        const bunny = this.addChild(new PIXI.Sprite(bunnyTexture));
        bunny.x = -300;
        bunny.scale.set(8);
        
        dp.app.ticker.add(() => {
            yukkuri.rotation += Utils.degreesToRadians(1);
        });

        

    }

    old_init(){
        /**
         * 背景グリッド
         */
        const backgroundGrid = new PIXI.TilingSprite(
            dp.assets.backgroundGrid,
            dp.limitedScreen.width,
            dp.limitedScreen.height,
        );
        backgroundGrid.x = dp.limitedScreen.negativeHalfWidth;
        backgroundGrid.y = dp.limitedScreen.negativeHalfHeight;
        this.addChild(backgroundGrid);
        
        // アニメーションテスト
        let scaleFactor = 2;
        let direction = -0.01;
        dp.app.ticker.add(() => {
            scaleFactor += direction;
            if (scaleFactor <= 1 || scaleFactor >= 2) direction *= -1;
            
            // tileScaleの変更
            // backgroundGrid.tileScale.set(scaleFactor, scaleFactor);
            
            // tilePositionの調整
            backgroundGrid.tilePosition.set(
                - backgroundGrid.width / 2 * (scaleFactor - 1),
                - backgroundGrid.height / 2 * (scaleFactor - 1)
            );
        });


        const bulgeDefaultRadius = 250;
        const bulgeDefaultStrength = 1;
        const bulgePinchFilter = new PIXI.filters.BulgePinchFilter(
            {
                center:     [0.5, 0.5],             // 画像の中央に効果を適用
                radius:     bulgeDefaultRadius,     // 効果の半径
                strength:   bulgeDefaultStrength,   // 効果の強さ（1で最大膨張、-1で最大縮小）
            }
        );
        backgroundGrid.filters = [bulgePinchFilter];
        // tilingSprite.visible = false;
        
        const bulgeSlider1 = Utils.addUISlider(dataProvider.app, dataProvider.spRect.width - 100, bulgePinchFilter, 'radius', 0, 500, bulgeDefaultRadius, 'Bulge.radius');
        this.addChild(bulgeSlider1);
        bulgeSlider1.x = 0 - dataProvider.limitedScreen.halfWidth + 50;
        bulgeSlider1.y = dataProvider.limitedScreen.halfHeight - 250;
        
        const bulgeSlider2 = Utils.addUISlider(dataProvider.app, dataProvider.spRect.width - 100, bulgePinchFilter, 'strength', -5, 5, bulgeDefaultStrength, 'Bulge.strength');
        this.addChild(bulgeSlider2);
        bulgeSlider2.x = 0 - dataProvider.limitedScreen.halfWidth + 50;
        bulgeSlider2.y = dataProvider.limitedScreen.halfHeight - 400;

    }

    /** ------------------------------------------------------------
        * アセットをまとめてロード
        * 公式の画像でテスト読み込み
     */
    loadAssets(){
        PIXI.Assets.add('flowerTop', 'https://pixijs.com/assets/flowerTop.png');
        PIXI.Assets.add('eggHead', 'https://pixijs.com/assets/eggHead.png');
        PIXI.Assets.add('designGuide', './assets/Frame 1.png');
        PIXI.Assets.add('backgroundGrid', './assets/background_grid2.png');
        // PIXI.Assets.add('displacement', './assets/displacement_map.png');
        PIXI.Assets.add('displacementImage', './assets/displacement_map.png');
        PIXI.Assets.add('yukkuri', 'https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F2707139%2F9b86d3f7-2c11-29c2-626c-7064579101f8.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=9ee2c21091d93e2a720ebc16fc208db3');
        PIXI.Assets.add('bunny', 'https://pixijs.com/assets/bunny.png');


        const assetsPromise = PIXI.Assets.load([
            'flowerTop',
            'eggHead',
            'designGuide',
            'displacementImage',
            'backgroundGrid',
            'yukkuri',
        ]);
        
        assetsPromise.then((items) => {
            dataProvider.assets = items;
            this.init();
            // this.initSmoothTest();
            // this.initA();
            // this.old_init();
        });
    }




    /** ------------------------------------------------------------
         * resizeHandler
         * 
     */
    resizeHandler(width, height){
        // PCの場合のみAppRootをいい感じにリサイズする
        let paddingFactorW = 0.95
        let paddingFactorH = 0.95;

        let maxW = dataProvider.spRect.width;
        let maxH = dataProvider.spRect.height;

        // 最大表示幅と高さを決める
        let containerMaxWidth = paddingFactorW * window.innerWidth; 
        let containerMaxHeight = paddingFactorH * window.innerHeight;
        
        let resizeRatio = Math.min(containerMaxWidth/maxW, containerMaxHeight/maxH);
        if(containerMaxWidth < maxW || containerMaxHeight < maxH) {
            if(resizeRatio > 0.5){
                resizeRatio = 0.5;
            }
            this.scale.x = resizeRatio;
            this.scale.y = resizeRatio;
        }

        if(this._debug){
            this.updateSPFrame(resizeRatio);
        }
    }

    /** ============================================================
        * Debug時要素
     */
    initSPFrame(){
        let lineColor = 0x00FFFF;
        let lineWidth = 10;

        const debugFrame = GraphicsHelper.exDrawRect(
            0, 0, 
            dataProvider.spRect.width,
            dataProvider.spRect.height,
            {
                color: lineColor,
                width: lineWidth,
            }, false
        );

        debugFrame.pivot.x = debugFrame.width/2;
        debugFrame.pivot.y = debugFrame.height/2;
        this.debugAssets.addChild(debugFrame);

        this._labelBackground = GraphicsHelper.exDrawRect(0, 0, 100, 30, false, 0xFFFFFF);
        this._labelBackground.x = 0 - debugFrame.width / 2 + 20;
        this._labelBackground.y = 0 - debugFrame.height / 2 + 20;

        this.debugAssets.addChild(this._labelBackground);
        
        this._label = new PIXI.Text('Label');
        this._label.x = 0 - debugFrame.width / 2 + 30;
        this._label.y = 0 - debugFrame.height / 2 + 20;
        this.debugAssets.addChild(this._label);
        this.updateSPFrame();
    }

    updateSPFrame(resizeRatio = 1){
        this._label.text = `${Utils.roundTo(this.width, 1)} : ${Utils.roundTo(this.height, 1) } - ${Utils.roundTo(resizeRatio, 1)}`;
        this._labelBackground.width = this._label.width + 20;
    }
}