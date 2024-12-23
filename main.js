import Utils from "./Utils.js";
import GraphicsHelper from "./helper/GraphicsHelper.js";
import { dataProvider, dp } from "./dataProvider.js";

import { ApplicationRoot } from "./ApplicationRoot.js";
import { FilteredApplicationRoot } from "./FilteredApplicationRoot.js";
// import { BasicApplicationRoot } from "./BasicApplicationRoot.js";

console.log(PIXI.VERSION)
/* ------------------------------------------------------------
    変数定義
------------------------------------------------------------ */

/* ------------------------------------------------------------
    アセット読み込み
------------------------------------------------------------ */
WebFont.load({
    google: {
        families: ['Inter:100,600,800,900'],
    },
    
    active: () => {
        console.log('OK: Font');
        init();
    },

    // フォント読み込み失敗時
    inactive: () => {
        console.log("ER: Font");
    },
});

function init(){
    //  app instance
    let app = new PIXI.Application({
        background: '#FFFFFF',
        resizeTo  : window,
        /**
         * @todo 高解像度端末の対応について調べる
         * これonにしたらメモリが圧迫して、
         * [Warning] Total canvas memory use exceeds the maximum limit (224 MB)とシミュレーターで怒られた
         */
        // resolution: window.devicePixelRatio || 1,
        // autoDensity: true,
    });
    
    dataProvider.app = app;
    dataProvider.isMobile = Utils.isMobileDevice();
    if(dataProvider.isMobile){
        dataProvider.spRect = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height);
    }else{
        // ここでSP画面のRectangleを指定する
        dataProvider.spRect = new PIXI.Rectangle(0, 0, 980, 1668);
    }

    dataProvider.limitedScreen = {
        width             : dataProvider.spRect.width,
        height            : dataProvider.spRect.height,
        halfWidth         : dataProvider.spRect.width / 2,
        halfHeight        : dataProvider.spRect.height / 2,
        negativeWidth     : 0 - dataProvider.spRect.width,
        negativeHeight    : 0 - dataProvider.spRect.height,
        negativeHalfWidth : 0 - dataProvider.spRect.width / 2,
        negativeHalfHeight: 0 - dataProvider.spRect.height / 2,
    };

    document.body.appendChild(app.view);
    let appRoot = app.stage.addChild(new ApplicationRoot(true));
    // let appRoot = app.stage.addChild(new FilteredApplicationRoot());

    /**
     * @todo ここ綺麗にしたい
     */
    // const appRootMask = GraphicsHelper.exDrawRect(0, 0, dp.limitedScreen.width/2, dp.limitedScreen.height/2, false, true);
    // Utils.pivotCenter(appRootMask);
    // app.stage.addChild(appRootMask);
    // appRoot.mask = appRootMask;
    // if(Utils.isMobileDevice()){
    //     appRoot.mask = undefined;
    // }
/* ------------------------------------------------------------
    resize Event
------------------------------------------------------------ */
    app.renderer.on('resize', (width, height) => {
        let w = width == undefined ? window.innerWidth : width;
        let h = height == undefined ? window.innerHeight : height;
        // 中央揃え
        appRoot.x = w / 2;
        appRoot.y = h / 2;
        // PC環境ではSPRect範囲内のリサイズ
        if(!Utils.isMobileDevice()){
            appRoot.resizeHandler(w, h);

            // appRootMask.x = appRoot.x;
            // appRootMask.y = appRoot.y;
            // appRootMask.scale.set(appRoot.scale.x * 2, appRoot.scale.y * 2);
        }
    });
    app.renderer.emit('resize');
}