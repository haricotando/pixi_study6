import Utils from './Utils.js';

export class UIKitSlider extends PIXI.Container {
    /**
     * 
     * @param {PIXI.Application} app - PIXIアプリのインスタンス
     * @param {number} sliderWidth - 作成するSliderの幅
     * @param {object} targetObject - 対象オブジェクト
     * @param {string} keyString - 対象パラメータ名
     * @param {number} minVal - スライダー最小時の値
     * @param {number} maxVal - スライダー最大時の値
     * @param {number} [defaultVal=valFrom] - デフォルトの値、指定がなければ最小値
     * @param {string} label - ラベルを付ける場合
     */

    constructor(app, sliderWidth, valFrom, valTo, defaultVal = valFrom, label = false) {
        super();

        this.val = defaultVal;
        this.valFrom = valFrom;
        this.valTo = valTo;

        const relativeValTo = this.valTo - this.valFrom;
        const relativeValFrom = this.valFrom - (this.valTo - relativeValTo);

        /**
         * @todo これがなんなのか調べる（不要かも）
         */
        app.stage.hitArea = app.screen;
        
        const sliderBox = new PIXI.Graphics().beginFill(0x999999).drawRect(0, 0, sliderWidth, 30);
        this.addChild(sliderBox);
        const handle = new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, 32);
        
        const halfHandleWidth = handle.width / 2;
        handle.x = defaultVal / this.valTo * (sliderWidth - handle.width) + halfHandleWidth;
        handle.y = sliderBox.height / 2;
        handle.eventMode = 'static';

        /**
         * @todo これがなんなのか調べる
         */
        handle.cursor = 'pointer';
        sliderBox.addChild(handle);

        const valText = this.addChild(new PIXI.Text('120', {
            fontSize: 40, fill: 0xFFFFFF,
        }));
        valText.x = sliderBox.x + sliderBox.width / 2;
        valText.y = 40;
        valText.anchor.set(0.5, 0);

        const onDragStart = () => {
            app.stage.eventMode = 'static';
            app.stage.addEventListener('pointermove', onDrag);
        }

        const onDragEnd = (e) => {
            app.stage.eventMode = 'auto';
            app.stage.removeEventListener('pointermove', onDrag);
        }

        const onDrag = (e) => {
            const maxSlide = sliderWidth - handle.width;
            const handleNext = Math.max(halfHandleWidth, Math.min(sliderBox.toLocal(e.global).x, sliderWidth - halfHandleWidth));
            const relative = handleNext - halfHandleWidth;
            handle.x = handleNext;
            const hundredized = relative / maxSlide * 100;
            this.val = hundredized / 100 * relativeValTo + this.valFrom;
            updateLabel();
            this.emit("customEvent", { 
                value  : this.val,
                message: "イベントが発火されました！"
            });
        }
        
        const updateLabel = () => {
            valText.text = label !== false ? `${label} = ` : '';
            valText.text += `${Utils.roundTo(this.val, 1)} (${Utils.roundTo(this.val / this.valTo * 100, 0)}%)`;
        }

        updateLabel();
        handle.on('pointerdown', onDragStart).on('pointerup', onDragEnd).on('pointerupoutside', onDragEnd);
    }
}