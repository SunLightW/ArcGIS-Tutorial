
//多边形
function addPolygon(graphicsLayer) {

    toolbar = new esri.toolbars.Draw(map);
    toolbar.on("draw-end", function(evt){
        console.log(evt);
        addPolygonToMap(evt,graphicsLayer);
    });
    toolbar.activate(esri.toolbars.Draw.POLYGON);
}

function addPolygonToMap(evt,graphicsLayer){

    var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DOT,new esri.Color([255,0,0]),3), new esri.Color([255,255,0,0.25]));
    var graphic = new esri.Graphic(evt.geometry, symbol);
    graphicsLayer.add(graphic);
    toolbar.deactivate();
}
