
function addLine() {

	toolbar = new esri.toolbars.Draw(map);
	toolbar.on("draw-end", addLineToMap);
	toolbar.activate(esri.toolbars.Draw.LINE);
}
function addLineToMap(evt){

	var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DOT,new esri.Color([255,0,0]),3);
	var graphic = new esri.Graphic(evt.geometry, symbol);
	graphicsLayer.add(graphic);

	toolbar.deactivate();
}

function addFreeLine() {

	toolbar = new esri.toolbars.Draw(map);
	toolbar.on("draw-end", addFreeLineToMap);
	toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYLINE);
}
function addFreeLineToMap(evt){
	var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new esri.Color([255,0,0]),3);
	var graphic = new esri.Graphic(evt.geometry, symbol);
	graphicsLayer.add(graphic);

	toolbar.deactivate();
}
