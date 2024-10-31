import { dataProvider, dp } from "./dataProvider.js";
import { UIKitSlider } from "./UIKitSlider.js";

class Utils {
    /** ------------------------------------------------------------
     * 実行テスト関数
     * Utils.hello();
     */
    static hello(){
        console.log('hello');
    }

    /** ============================================================
     * 環境変数系
     */
    /** ------------------------------------------------------------
     * 実行環境がモバイルデバイスかどうかの判別（タブレットはモバイルに含めない）
     * @example
     * const bool = Utils.isMobileDevice();
     *  -> return 
     *      true or false
     */
    static isMobileDevice(){
        return navigator.userAgent.match(/iPhone|Android.+Mobile/) ? true : false;
    }




    /** ============================================================
     * PIXIJS関連
     */
    /** ------------------------------------------------------------
     * PIXI.DisplayObject（Container, Sprite, Graphics etc...）のpivotのラッパー
     * @param {PIXI.DisplayObject} target - 対象のDisplayObject
     * @param {bool} soundRound - 小数点の四捨五入
     * 
     * @example
     * targetを中央揃え（pivot=0.5）にして、小数点が発生しても丸めない
     * 
     * const target = this.addChild(new PIXI.Graphics());
     * Utils.pivotCenter(target);
     */
    static pivotCenter(target, shouldRound = false){
        if(shouldRound){
            target.pivot.x = Math.round(target.width / 2);
            target.pivot.y = Math.round(target.height / 2);
        }else{
            target.pivot.x = target.width / 2;
            target.pivot.y = target.height / 2;
        }
    }




    /** ============================================================
     * Math
     */

    /** ------------------------------------------------------------
     * 小数点以下を指定桁数に整える
     * @param {number} number - 対象の値
     * @param {number} digit - 丸める小数点桁数
     * 
     * @example
     * const val = 1,1111
     * Utils.roundTo(val, 2);
     *  -> return
     *      1.11
     */
    static roundTo(number, digit){
        return parseFloat(number.toFixed(digit));
    }




    /** ============================================================
     * 自作ライブラリのラッパー
     */
    /** ------------------------------------------------------------
     * UISliderKit のインスタンス作成とイベント設定を簡易にする
     * @param {PIXI.Application} app - PIXIアプリのインスタンス
     * @param {number} sliderWidth - 作成するSliderの幅
     * @param {object} targetObject - 対象オブジェクト
     * @param {string} keyString - 対象パラメータ名
     * @param {number} minVal - スライダー最小時の値
     * @param {number} maxVal - スライダー最大時の値
     * @param {number} [defaultVal=minVal] - デフォルトの値、指定がなければ最小値
     * @param {string} label - ラベルを付ける場合
     * 
     * @example
     * DisplacementFilterのscale調整スケールの作成
     * 0 to 200、デフォルト100
     * 
     * const slider = Utils.addUISlider(dataProvider.app, dataProvider.spRect.width, displacementFilter, 'scale', 0, 200, 100, 'Filter');
     * this.addChild(displacementSlider);
     * 
     */
    static addUISlider(app, sliderWidth, targetObject, keyString, minVal, maxVal, defaultVal = minVal, label){
        const slider = new UIKitSlider(app, sliderWidth, minVal, maxVal, defaultVal, label);
        slider.on('customEvent', (data) => {
            /**
             * scale.x,y だけのための分岐で気持ち悪いがとりあえずこれで
             */
            if(keyString == 'scale'){
                targetObject.scale.x = data.value;
                targetObject.scale.y = data.value;
            }else{
                targetObject[keyString] = data.value;
            }
        });
        return slider;
    }


    /* ############################################################

        以下はまだ検証中

    ############################################################ */

    /**
     * 画像をリサイズする関数
     * @param {Object} image - 元の画像サイズオブジェクト { width: number, height: number }
     * @param {Object} frame - 枠のサイズオブジェクト { width: number, height: number }
     * @param {string} option - リサイズオプション "fit", "contain", "cover"
     * @returns {Object} - リサイズ後の幅と高さ { width: number, height: number }
     */
    static resizeImage(image, frame, option = 'cover') {
        let newWidth, newHeight;
        const imgAspectRatio = image.width / image.height;
        const frameAspectRatio = frame.width / frame.height;

        switch (option) {
            case "fit":  // A: 比率無視で枠にフィット
                newWidth = frame.width;
                newHeight = frame.height;
                break;
            
            case "contain":  // B: 比率維持で枠内に収める（余白あり）
                if (imgAspectRatio > frameAspectRatio) {
                    newWidth = frame.width;
                    newHeight = frame.width / imgAspectRatio;
                } else {
                    newWidth = frame.height * imgAspectRatio;
                    newHeight = frame.height;
                }
                break;
            
            case "cover":  // C: 比率維持で枠を完全に埋める（余白なし）
                if (imgAspectRatio > frameAspectRatio) {
                    newWidth = frame.height * imgAspectRatio;
                    newHeight = frame.height;
                } else {
                    newWidth = frame.width;
                    newHeight = frame.width / imgAspectRatio;
                }
                break;

            default:
                throw new Error("Invalid option. Use 'fit', 'contain', or 'cover'.");
        }
        
        return { width: newWidth, height: newHeight };
    }


    static fitWidth(w, h, max, byScale){
        const maxW = max;
        const maxH = max;
        const tmpWidth = maxW;
        const resizeRate = maxW / w;
        const tmpHeight = Math.round(h * resizeRate);
                                
        const tmpScaleX = tmpWidth / maxW;
        const tmpScaleY = tmpHeight / maxH;
        if(byScale) {
            return [tmpScaleX, tmpScaleY];
        }else {
            return [tmpWidth, tmpHeight];
        }
    }



    /* ------------------------------------------------------------
        Utils.cloneTextStyle(baseStyle, {opt:value})
        ベースTextStyleから複製して使い回す
    ------------------------------------------------------------ */
    static cloneTextStyle(originalStyle, opt) {
        const cloned = new PIXI.TextStyle(JSON.parse(JSON.stringify(originalStyle)));
        if(opt){
            for (const key in opt) {
                cloned[key] = opt[key];
            }
        }
        return cloned;
    }
    /* ------------------------------------------------------------
        Utils.findObjectByID(list, 1);

        list = [
            {id:1, name:'john'}.
            {id:2, name:'paul'}.
        ]
    ------------------------------------------------------------ */
    static findObjectById(array, id) {
        return array.find(obj => obj.id === id);
    }
    /* ------------------------------------------------------------
        Utils.loadDesignGuide('design_guide/guide.png', )
        デザインガイドをロードする
    ------------------------------------------------------------ */
    static loadDesignGuide(path){
        const texture = PIXI.Texture.from(path);
        const sprite = new PIXI.Sprite(texture);
        texture.baseTexture.addListener("loaded", (event) => {
            // dataProvider.app 依存は良くない
            let destSize = this.fitWidth(sprite.width, sprite.height, dataProvider.app.renderer.width);
            sprite.width = destSize[0];
            sprite.height = destSize[1];
            // this.algn(sprite);
        })
        return sprite;
    }

    static snapshotPos(target){
        target.snapshot = {
            x:      target.x,
            y:      target.y,
            width:  target.width,
            height: target.height
        };
        
    }

    // static snapshotState(target){
    //     console.log(target)
    //     target.snapshot = {
    //     };
    // }

    /* ------------------------------------------------------------
        AlignHelperから一旦統合する
    ------------------------------------------------------------ */
    // static alignTopWindow(target){
    //     target.x = Math.round(window.innerWidth/2 - target.width/2);
    //     target.y = 0;
    // }
    
    // static alignBottomWindow(target){
    //     target.x = Math.round(window.innerWidth/2 - target.width/2);
    //     target.y = window.innerHeight - target.height;
    // }




    /*
        余白あってもいいからいい感じに収めるのと、
        余白無くしてクロップしてマスクするから、と両方の用途ありそうなのでもう少し考える
    */
    // static fitInside(w, h, max, byScale, by){
    //     var current = [];
    //     let _by = by ? by : 'auto';
    //     switch(_by) {
    //         case 'auto':
    //             current = this.fitWidth(w, h, max, byScale);
    //             if(current[1] > max) {
    //                 current = this.fitHeight(w, h, max, byScale);
    //             }
    //             break;
    //         case 'width':
    //             current = this.fitWidth(w, h, max, byScale);
    //             break;
    //         case 'height':
    //             current = this.fitHeight(w, h, max, byScale);
    //             break;
    //         default:
    //             break;
    //     }
    //     return current;
    // }

    // static fitWidth(w, h, max, byScale){
    //     const maxW = max;
    //     const maxH = max;
    //     const tmpWidth = maxW;
    //     const resizeRate = maxW / w;
    //     const tmpHeight = Math.round(h * resizeRate);
                                
    //     const tmpScaleX = tmpWidth / maxW;
    //     const tmpScaleY = tmpHeight / maxH;
    //     if(byScale) {
    //         return [tmpScaleX, tmpScaleY];
    //     }else {
    //         return [tmpWidth, tmpHeight];
    //     }
    // }

    // static fitHeight(w, h, max, byScale){
    //     const maxH = max;
    //     const maxW = max;
                                
    //     const tmpHeight = maxH;
    //     const resizeRate = maxH / h;
    //     const tmpWidth = Math.round(w * resizeRate);		
    //     const tmpScaleX = tmpWidth / maxW;
    //     const tmpScaleY = tmpHeight / maxH;
    //     if(byScale) {
    //         return [tmpScaleX, tmpScaleY];
    //     }else {
    //         return [tmpWidth, tmpHeight];
    //     }
    // }

    /* ------------------------------------------------------------
        Grid引く
    ------------------------------------------------------------ */
    // static drawGrid(gridSize){
    //     let gridContainer = new PIXI.Sprite();
    //     const _gridSize = gridSize ? gridSize : 200;
    //     const numOfLoops = Math.ceil(window.innerHeight/_gridSize);

    //     this._gridLine(gridContainer, 'v', 0, 0, 4);
    //     this._gridLine(gridContainer, 'h', 0, 0, 4);
    //     for(let i=1; i<numOfLoops; i++){
    //         this._gridLine(gridContainer, 'v', _gridSize * i);
    //         this._gridLine(gridContainer, 'v', 0-_gridSize * i);
    //         this._gridLine(gridContainer, 'h', _gridSize * i);
    //         this._gridLine(gridContainer, 'h', 0-_gridSize * i);
    //     }

    //     gridContainer.x = window.innerWidth / 2;
    //     gridContainer.y = window.innerHeight / 2;
    //     return gridContainer;
    // }

    // static _gridLine(container, vh, offsetPos, color, lineWidth, lineLength){
    //     let offsetLen = 0;
    //     let line = new PIXI.Graphics();
    //     line.lineStyle(
    //         lineWidth ? lineWidth : 2, 
    //         color ? color : 'red'
    //     );
    //     let val = lineLength ? lineLength : (vh == 'v' ? window.innerWidth : window.innerHeight);
    //     let v = vh == 'v' ? val-offsetLen : 0;
    //     let h = vh == 'h' ? val-offsetLen : 0;
    //     line.moveTo(0-v/2, 0-h/2);
    //     line.lineTo(v/2, h/2);
    //     if(offsetPos){
    //         switch(vh){
    //             case 'v':
    //                 line.y += offsetPos;
    //                 break;
    //             case 'h':
    //                 line.x += offsetPos;
    //                 break;
    //             default:
    //         }
    //     }
    //     container.addChild(line);
    //     return line;
    // }

    /* ------------------------------------------------------------
        pivot
    ------------------------------------------------------------ */
    // static pivotCenter(target){
    //     target.pivot.set(target.width/2, target.height/2);
    // }
    // static pivotX(target){
    //     target.pivot.x = target.width / 2;
    // }
    // static pivotY(target){
    //     target.pivot.y = target.height / 2;
    // }

    
}

export default Utils;