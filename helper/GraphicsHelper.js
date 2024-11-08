class GraphicsHelper {

    /* ------------------------------------------------------------
        drawRect + line, fill
    ------------------------------------------------------------ */
    static exDrawRect(x, y, width, height, line, fill) {
        const graphics = new PIXI.Graphics();
        if(line){
            let lineWidth = line.width ? line.width : 1;
            let lineColor = line.color != undefined ? line.color : 0xFFFFFF;
            let lineAlpha = line.alpha != undefined ? line.alpha : 1;
            graphics.lineStyle(lineWidth, lineColor, lineAlpha, 0);
            /*
            2024/10/08 4つ目のパラメータ　alignment追加
            The alignment of any lines drawn (0.5 = middle, 1 = outer, 0 = inner). WebGL only.
            Default Value:
            0.5
*/
        }

        if(fill){
            let fillColor = fill.color != undefined ? fill.color : 0xFFFFFF;
            let fillAlpha = fill.alpha != undefined ? fill.alpha : 1;
            graphics.beginFill(fillColor, fillAlpha);
        }
        graphics.drawRect(x, y, width, height, 0);
        if(fill){
            graphics.endFill();
        }
        return graphics;
    }

    /* ------------------------------------------------------------
        drawRoundedRect + line, fill
    ------------------------------------------------------------ */
    static exDrawRoundedRect(x, y, width, height, radius, line, fill) {
        const graphics = new PIXI.Graphics();
        if(line){
            let lineWidth = line.width ? line.width : 1;
            let lineColor = line.color != undefined ? line.color : 0xFFFFFF;
            let lineAlpha = line.alpha != undefined ? line.alpha : 1;
            graphics.lineStyle(lineWidth, lineColor, lineAlpha);
        }

        if(fill){
            let fillColor = fill.color != undefined ? fill.color : 0xFFFFFF;
            let fillAlpha = fill.alpha != undefined ? fill.alpha : 1;
            graphics.beginFill(fillColor, fillAlpha);   
        }
        graphics.drawRoundedRect(x, y, width, height, radius);
        if(fill){
            graphics.endFill();
        }
        return graphics;
    }

    /* ------------------------------------------------------------
        drawCircle + line, fill
    ------------------------------------------------------------ */
    static exDrawCircle(x, y, radius, line, fill){
        const graphics = new PIXI.Graphics();
        
        if(line){
            let lineWidth = line.width ? line.width : 1;
            let lineColor = line.color != undefined ? line.color : 0xFFFFFF;
            let lineAlpha = line.alpha != undefined ? line.alpha : 1;
            graphics.lineStyle(lineWidth, lineColor, lineAlpha);
        }
        
        if(fill){
            let fillColor = fill.color != undefined ? fill.color : 0xFFFFFF;
            let fillAlpha = fill.alpha != undefined ? fill.alpha : 1;
            graphics.beginFill(fillColor, fillAlpha);   
        }
        
        graphics.drawCircle(x, y, radius);
        
        if(fill){
            graphics.endFill();
        }
        return graphics;
    }

    /** ------------------------------------------------------------
     * 六角形を書く（上の面に角がある状態）
     * @param {number} radius - 六角形の半径
     * @param {array} line - Linestyleのオプションを配列渡し
     * @param {array} fill - fillのオプションを配列渡し
     * @param {boolean} [flatTop = true] - 上面がフラットか角か
     * @returns {PIXI.Graphics} - 描画された六角形
     */
    static drawHexagon(radius = 100, line, fill, flatTop = true){
        // たぶん 0, 0 以外必要性がないと思うけど
        const centerX = 0;
        const centerY = 0;
        const angleOffset = flatTop ? 0 : Math.PI / 6;

        const hexagon = new PIXI.Graphics();
        if(line){
            hexagon.lineStyle(...line);
        }
        if(fill){
            hexagon.beginFill(...fill);
        }
                
        // 最初の頂点を設定
        hexagon.moveTo(
            centerX + radius * Math.cos(angleOffset),
            centerY + radius * Math.sin(angleOffset)
        );

        // 各頂点を順に描画
        for (let i = 1; i <= 6; i++) {
            const angle = (Math.PI / 3) * i + angleOffset;
            hexagon.lineTo(
            centerX + radius * Math.cos(angle),
            centerY + radius * Math.sin(angle)
            );
        }
        return hexagon;
    }

    

    /* ============================================================
        TEMPORARY
    ============================================================ */
    static addCross(size = 100, lineWidth = 2, color = 0xFF0000, alpha = 1){
        const graphics = new PIXI.Graphics();
        const half = size / 2;
        graphics.lineStyle(lineWidth, color, alpha);
        graphics.moveTo(0 - half, 0);
        graphics.lineTo(half, 0);
        graphics.moveTo(0, 0 - half);
        graphics.lineTo(0, half);
        return graphics;
    }
}
    
export default GraphicsHelper;