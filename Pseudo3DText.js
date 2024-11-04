import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './Utils.js';

export class Pseudo3DText extends PIXI.Container {

    constructor() {
        super();
        this._initContainer();
    }

    _initContainer(){
        this.container = this.addChild(new PIXI.Container());
        
        this._addCharacter('C', 0);
        this._addCharacter('O', 220);
        this._addCharacter('M', 460);
        this._addCharacter('A', 690);
        this.addChild(GraphicsHelper.addCross());
        // Utils.pivotCenter(this.container);
        this.x = -348;
        this.y = -145;
    }


    _addCharacter(char, xPos = 100, yPos = 100, size = 300){
        const charContainer = this.container.addChild(new PIXI.Container());
        charContainer.x = xPos;

        const faceStyle = new PIXI.TextStyle({
            fontFamily     : 'Inter',
            fontSize       : 286,
            fontWeight     : 600,
            fill           : [0xE7E0E0, 0xD3CDCD],
        });

        

        const layers = 5;
        let sideStyle = Utils.cloneTextStyle(faceStyle, {fill: 0xD4D0C8});

        for (let i = 0; i < layers; i++) {
            // sideStyle.fontSize = Math.round(sideStyle.fontSize / 1.005);
            const sideText = charContainer.addChild(new PIXI.Text(char, sideStyle));
            sideText.x = 0 - i * (xPos / size);
            sideText.y = i * (yPos / size);
            Utils.pivotCenter(sideText);
        }
        
        const faceText = charContainer.addChild(new PIXI.Text(char, faceStyle));
        Utils.pivotCenter(faceText);

    }


}