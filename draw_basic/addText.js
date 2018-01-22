//文字
function addText() {
	toolbar = new esri.toolbars.Draw(map);
	toolbar.on("draw-end", addTextToMap);
	toolbar.activate(esri.toolbars.Draw.POINT);
}

function addTextToMap(evt){
	var symbol = new esri.symbol.TextSymbol("测试TEXT", new esri.symbol.Font("10px",esri.symbol.Font.SYTLE_NORMAL,esri.symbol.Font.SYTLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL,esri.symbol.Font.WEIGHT_BOLD,"Courier"),new esri.Color([255,0,0]));

	symbol.setAlign(esri.symbol.TextSymbol.ALIGN_START);

	var graphic = new esri.Graphic(evt.geometry, symbol);

	graphicsLayer.add(graphic);

	toolbar.deactivate();
}
