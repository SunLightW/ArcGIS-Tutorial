function addPoint() {		
	toolbar = new esri.toolbars.Draw(map);
	toolbar.activate(esri.toolbars.Draw.POINT);
	toolbar.on("draw-end", addPointToMap);
}

function addPointToMap(evt) {
	map.graphics.clear();
	//graphicsLayer.clear();
	var geometry = evt.geometry;
	var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,25,
		new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DOT,new esri.Color([255,0,0]),3),
		new esri.Color([0,255,0,0.25])
	);

	var graphic = new esri.Graphic(geometry, symbol);
	graphicsLayer.add(graphic);
	toolbar.deactivate();
}
