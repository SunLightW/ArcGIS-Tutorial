
(function() {
	dojo.require("esri.toolbars.draw");
	dojo.require("esri.symbols.PictureMarkerSymbol");
	dojo.require("esri.symbols.SimpleMarkerSymbol");
	dojo.require("esri.symbols.SimpleFillSymbol");
	dojo.require("esri.symbols.TextSymbol");
	dojo.require("esri.Color");
	dojo.require("esri.InfoTemplate")
		//	dojo.require("esri.graphic");
		//	dojo.require("esri.graphic");
		//	dojo.require("esri.graphic");
})();

function addPicture() {
	console.log("1");
	toolbar = new esri.toolbars.Draw(map);
	toolbar.activate(esri.toolbars.Draw.POINT);
	toolbar.on("draw-end", addPictureToMap);

}

function addPictureToMap(evt) {
	// map.graphics.clear();
	console.log("2");
	var geometry = evt.geometry;
	var symbol = new esri.symbol.PictureMarkerSymbol("img/p0.gif", 51, 51);
	var attr = {
		name: "name test",
		content: "content test"
	};
	var infoTemplate = new esri.InfoTemplate("${name}", "${content}");
	var graphic = new esri.Graphic(geometry, symbol, attr, infoTemplate);
	iTip = new InfoTip("i2Div", "infoTip shadow", map.position, true);
	graphicsLayer.on("mouse-over", g_onMouseOverHandler);
	graphicsLayer.on("mouse-out", g_onMouseOutHandler);
	graphicsLayer.add(graphic);
	toolbar.deactivate();
}

function g_onMouseOverHandler(evt) {
	if(evt.graphic.attributes) {
		//var img = '<img src="images/i_flag.png"/ style="height:20px;width20px;border:0;">';
		var str = '<div class="container" > <div class="dialogTitle" >物资详细信息</div> <div class="line" ></div> <div class="dialogContent"> <table  > <tr> <td class="tdtitle">名称 ：</td> <td>路口监控摄像头</td> </tr> <tr> <td class="tdtitle">编号 ：</td> <td>C165-K4230</td> </tr> <tr> <td class="tdtitle">厂商 ：</td> <td>科达</td> </tr> <tr> <td class="tdtitle">数量 ：</td> <td>1</td> </tr> <tr> <td class="tdtitle">责任人 ：</td> <td>滨湖公安分局</td> </tr> <tr> <td class="tdtitle">联系电话 ：</td> <td>61485110</td> </tr> <tr> <td class="tdtitle">安装时间 ：</td> <td>2015-10-16</td> </tr> <tr> <td class="tdtitle">在线状态 ：</td> <td>&nbsp;o&nbsp;在线</td> </tr> <tr> <td class="tdtitle">状态更新 ：</td> <td>2017-01-16&nbsp;14:18:09</td> </tr> </table> </div> </div>';
		iTip.setContent(str);
		iTip.show(evt.screenPoint);
	}
}

function g_onMouseOutHandler(evt) {
	iTip.hide();
}
