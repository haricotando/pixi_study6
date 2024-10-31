import { dataProvider, dp } from "./dataProvider.js";
import GraphicsHelper from "./helper/GraphicsHelper.js";
import { UIKitSlider } from "./UIKitSlider.js";
import Utils from "./Utils.js";

export class FilteredApplicationRoot extends PIXI.Container {
    
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
            this.debugAssets.addChild(GraphicsHelper.addCross(100, 10));
            this.initSPFrame();
        }
    }
    
    /** ------------------------------------------------------------
     * アセット読み込み等完了後スタート
    */
   init(){
       this.initFlterStudy();
       console.log('## AppRoot');
    }

    /** ------------------------------------------------------------
        * アセットをまとめてロード
        * 公式の画像でテスト読み込み
     */
    loadAssets(){
        PIXI.Assets.add('flowerTop', 'https://pixijs.com/assets/flowerTop.png');
        PIXI.Assets.add('eggHead', 'https://pixijs.com/assets/eggHead.png');
        PIXI.Assets.add('backgroundStar', './assets/star.png');
        PIXI.Assets.add('displacementImage', './assets/displacement_map.png');
        PIXI.Assets.add('displacementImage2', './assets/map2.png');

        const assetsPromise = PIXI.Assets.load([
            'flowerTop',
            'eggHead',
            'backgroundStar',
            'displacementImage',
            'displacementImage2',
        ]);
        
        assetsPromise.then((items) => {
            dataProvider.assets = items;
            this.init();
        });
    }

    /** ------------------------------------------------------------
        * フィルターテスト
     */
    initFlterStudy(){
        this.bgContainer = this.addChild(new PIXI.Container());

        const background = PIXI.Sprite.from(dataProvider.assets.backgroundStar);
        background.anchor.set(0.5);
        background.scale.set(1.5);
        this.bgContainer.addChild(background);
        
        /**
             * DisplacementFilterのテスト
        */
        const displacementDefaultScale = 100;
        
        const displacementSprite = PIXI.Sprite.from(dataProvider.assets.displacementImage);
        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        const displacementFilter = new PIXI.DisplacementFilter(displacementSprite);
        displacementFilter.scale.x = displacementDefaultScale;
        displacementFilter.scale.y = displacementDefaultScale;

        this.bgContainer.addChild(displacementSprite);
        this.bgContainer.filters = [displacementFilter];

        const displacementSlider = Utils.addUISlider(dataProvider.app, dataProvider.spRect.width - 100, displacementFilter, 'scale', 0, 200, displacementDefaultScale, 'Disp.scale');
        this.addChild(displacementSlider);
        displacementSlider.x = 0 - dataProvider.limitedScreen.halfWidth + 50;
        displacementSlider.y = dataProvider.limitedScreen.halfHeight - 100;

        /**
            * BulgePinchFilterのテスト
        */
        const bulgeDefaultRadius = 250;
        const bulgeDefaultStrength = 1;
        const bulgePinchFilter = new PIXI.filters.BulgePinchFilter(
            {
                center:     [0.5, 0.5],             // 画像の中央に効果を適用
                radius:     bulgeDefaultRadius,     // 効果の半径
                strength:   bulgeDefaultStrength,   // 効果の強さ（1で最大膨張、-1で最大縮小）
            }
        )
        this.bgContainer.filters.push(bulgePinchFilter);
        
        const bulgeSlider1 = Utils.addUISlider(dataProvider.app, dataProvider.spRect.width - 100, bulgePinchFilter, 'radius', 0, 500, bulgeDefaultRadius, 'Bulge.radius');
        this.addChild(bulgeSlider1);
        bulgeSlider1.x = 0 - dataProvider.limitedScreen.halfWidth + 50;
        bulgeSlider1.y = dataProvider.limitedScreen.halfHeight - 250;
        
        const bulgeSlider2 = Utils.addUISlider(dataProvider.app, dataProvider.spRect.width - 100, bulgePinchFilter, 'strength', -5, 5, bulgeDefaultStrength, 'Bulge.strength');
        this.addChild(bulgeSlider2);
        bulgeSlider2.x = 0 - dataProvider.limitedScreen.halfWidth + 50;
        bulgeSlider2.y = dataProvider.limitedScreen.halfHeight - 400;

        dataProvider.app.ticker.add(() => {
            // displacement filterで波作って
            displacementSprite.x += 1;
            displacementSprite.y += 1;
            
            // なんとなく雰囲気出す
            background.rotation += 0.0005;
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