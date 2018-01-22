/*加载ArcGIS相关服务,ArcGIS相关操作*/

/*********MAP CONTAIN****************/
var map;

/*********lAYER****************/
/*===网格图层===*/
var XWQ_LAYER;//XWQ
var STREET_LAYER;//JD
var SQBZ_LAYER;
/*====特征图层====*/
var SQ_FEATURE_LAYER;//SQ
var SQRJ_FEATURE_LAYER;//SQRJ
var SQYQ_FEATURE_LAYER;//SQYQ
var CG_FEATURE_LAYER;//CG
var ZSYQ_FEATURE_LAYER;//ZSYQ
var ZSYQDY_FEATURE_LAYER;//ZSYQDY

/***********COLOR***************/
/*====线颜色样式====*/
var DISTRICT_LINE_COLOR;//XWQ
var STREET_LINE_COLOR;//JD
var SQ_LINE_COLOR;//SQ
var SQRJ_LINE_COLOR;//SQRJ
var SQYQ_LINE_COLOR;//SQYQ
var CG_LINE_COLOR;//CG
var ZSYQ_LINE_COLOR;//ZSYQ
var ZSYQDY_LINE_COLOR;//ZSYQDY

var SQ_BJ_LINE_COLOR;//SQ

/*====样式====*/
var DISTRICT_FILL_COLOR;//XWQ
var STREET_FILL_COLOR;//JD
var SQ_FILL_COLOR;//SQ
var SQRJ_FILL_COLOR;//SQRJ
var SQYQ_FILL_COLOR;//SQYQ
var CG_FILL_COLOR;//CG
var ZSYQ_FILL_COLOR;//ZSYQ
var ZSYQDY_FILL_COLOR;//ZSYQDY

var SQ_BJ_FILL_COLOR;//SQ

var PROMINENT_FILL_COLOR;//HL

/***********RENDERER***************/
var SQ_RENDERER;//SQ
var SQRJ_RENDERER;//SQRJ
var SQYQ_RENDERER;//SQYQ
var CG_RENDERER;//CG
var ZSYQ_RENDERER;//ZSYQ
var ZSYQDY_RENDERER;//ZSYQDY

var SQ_BJ_RENDERER;//SQ

/************LINES & FILLS************/
/*====线型样式=====*/
var DISTRICT_LINE;//XWQ
var STREET_LINE;//JD
var SQ_LINE;//SQ
var SQRJ_LINE;//SQRJ
var SQYQ_LINE;//SQYQ
var CG_LINE;//CG
var ZSYQ_LINE;//ZSYQ
var ZSYQDY_LINE;//ZSYQDY

var SQ_BJ_LINE;//SQ

/*====面型样式=====*/
var DISTRICT_FILL;//XWQ
var STREET_FILL;//JD
var SQ_FILL;//SQ
var SQRJ_FILL;//SQRJ
var SQYQ_FILL;//SQYQ
var CG_FILL;//CG
var ZSYQ_FILL;//ZSYQ
var ZSYQDY_FILL;//ZSYQDY

var SQ_BJ_FILL;//SQ

/***********BASE***************/
var newGraphic;
var graphicsLayer;
var toolbar;
var editToolbar;

require([
        "esri/map",
        "esri/InfoTemplate",
        "esri/SpatialReference",
        "esri/graphic",
        "esri/Color",
        "esri/config",

        "esri/dijit/Scalebar",
        "esri/dijit/InfoWindow",

        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/GraphicsLayer",
        "esri/layers/FeatureLayer",

        "esri/geometry/Extent",
        "esri/geometry/Point",

        "esri/renderers/SimpleRenderer",

        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/PictureMarkerSymbol",

        "esri/toolbars/draw",
        "esri/toolbars/edit",

        "esri/tasks/FindTask",
        "esri/tasks/FindParameters",
        "esri/tasks/query",

        "dijit/TooltipDialog",
        "dijit/popup",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",

        "dojo/domReady!"
    ],
    function (Map,
              InfoTemplate,
              SpatialReference,
              Graphic,
              Color,
              esriConfig,
              Scalebar,
              InfoWindow,
              ArcGISDynamicMapServiceLayer,
              GraphicsLayer,
              FeatureLayer,
              Extent,
              Point,
              SimpleRenderer,
              SimpleMarkerSymbol,
              SimpleLineSymbol,
              SimpleFillSymbol,
              PictureMarkerSymbol,
              Draw,
              Edit,
              FindTask,
              FindParameters,
              Query,
              TooltipDialog,
              dijitPopup) {
        /**================START:全局基础=============**/
        /*======COLOR OF LINES======*/
        // DISTRICT_LINE_COLOR = new Color([148,0,211]);
        // STREET_LINE_COLOR = new Color([255, 255, 255]);
        SQ_LINE_COLOR = new Color([210,180,140]);
        SQRJ_LINE_COLOR = new Color([255, 255, 255]);
        SQYQ_LINE_COLOR = new Color([255, 255, 255]);
        CG_LINE_COLOR = new Color([0, 205, 0]);
        ZSYQ_LINE_COLOR = new Color([250,128,114]);
        ZSYQDY_LINE_COLOR = new Color([30,144,255]);

        SQ_BJ_LINE_COLOR = new  Color([205,55,0]);

        /*=====COLOR OF FILLS=======*/
        // DISTRICT_FILL_COLOR = new Color([255, 127, 80, 0.25]);//Coral珊瑚色
        // STREET_FILL_COLOR = new Color();
        SQ_FILL_COLOR = new Color([0,0,255,0.5]);
        SQRJ_FILL_COLOR = new Color([255, 105, 180, 0.5]);
        SQYQ_FILL_COLOR = new Color([255,48,48,0.5]);
        CG_FILL_COLOR = new Color([0,139,69,0.5]);
        ZSYQ_FILL_COLOR = new Color([255,48,48,0.5]);
        ZSYQDY_FILL_COLOR = new Color([255, 255, 0, 0.5]);

        SQ_BJ_FILL_COLOR = new Color([255,48,48,0.5]);

        PROMINENT_FILL_COLOR = new Color([255,255,0]);

        /*======SYMBOL OF LINES======*/
        // DISTRICT_LINE = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, DISTRICT_LINE_COLOR, 1);
        // STREET_LINE = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, DISTRICT_LINE_COLOR, 1);
        SQ_LINE = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, SQ_LINE_COLOR, 1);
        SQRJ_LINE = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, SQRJ_LINE_COLOR, 1);
        SQYQ_LINE = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, SQYQ_LINE_COLOR, 4);
        CG_LINE = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, CG_LINE_COLOR, 1);
        ZSYQ_LINE = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, ZSYQ_LINE_COLOR, 3);
        ZSYQDY_LINE = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, ZSYQDY_LINE_COLOR, 4);

        SQ_BJ_LINE = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, SQ_BJ_LINE_COLOR, 2);

        /*======SYMBOL OF FILLS======*/
        // DISTRICT_FILL = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, DISTRICT_LINE, DISTRICT_FILL_COLOR);
        // STREET_FILL = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, DISTRICT_LINE, STREET_FILL_COLOR);
        SQ_FILL = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, SQ_LINE, SQ_FILL_COLOR);
        SQRJ_FILL = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, SQRJ_LINE, SQRJ_FILL_COLOR);
        SQYQ_FILL = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, SQYQ_LINE, SQYQ_FILL_COLOR);
        CG_FILL = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, CG_LINE, CG_FILL_COLOR);
        ZSYQ_FILL = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, ZSYQ_LINE, ZSYQ_FILL_COLOR);
        ZSYQDY_FILL = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, ZSYQDY_LINE, ZSYQDY_FILL_COLOR);

        SQ_BJ_FILL = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL, SQ_BJ_LINE, SQ_BJ_FILL_COLOR);

        /*======REDERERS======*/
        // SQ_RENDERER = new SimpleRenderer(SQ_FILL);
        SQRJ_RENDERER = new SimpleRenderer(SQRJ_FILL);
        SQYQ_RENDERER = new SimpleRenderer(SQYQ_FILL);
        CG_RENDERER = new SimpleRenderer(CG_FILL);
        ZSYQ_RENDERER = new SimpleRenderer(ZSYQ_FILL);
        ZSYQDY_RENDERER= new SimpleRenderer(ZSYQDY_FILL);

        SQ_BJ_RENDERER = new SimpleRenderer(SQ_BJ_FILL);

        /*======MAP OBJECT======*/
        map = new Map("map", {
            logo: false,
            slider: false
        });

        /*======SCALEBAR======*/
        var scalebar = new Scalebar({
            map: map,
            scalebarUnit: "dual"
        });

        /*======DYNAMIC LAYERS=========*/
        XWQ_LAYER = new ArcGISDynamicMapServiceLayer(DISTRICT_SERVER);
        STREET_LAYER = new ArcGISDynamicMapServiceLayer(STREET_SERVER);
        SQBZ_LAYER= new ArcGISDynamicMapServiceLayer(SQBZ_SERVER);

        /*=====FEATURES=====*/
        SQ_FEATURE_LAYER = new FeatureLayer(SQ_FEATURE_SERVER, {
            mode: FeatureLayer.MODE_ONDEMAND,
            opacity: 0.7,
            outFields: ["*"]
        });

        SQRJ_FEATURE_LAYER = new FeatureLayer(SQRJ_FEATURE_SERVER, {
            mode: FeatureLayer.MODE_ONDEMAND,
            opacity: 0.7,
            outFields: ["*"]
        });

        SQYQ_FEATURE_LAYER = new FeatureLayer(STORE_FEATURE_SERVER, {
            mode: FeatureLayer.MODE_ONDEMAND,
            opacity: 0.7,
            outFields: ["*"]
        });

        CG_FEATURE_LAYER = new FeatureLayer(ROOD_FEATURE_SERVER, {
            mode: FeatureLayer.MODE_ONDEMAND,
            opacity: 0.7,
            outFields: ["*"]
        });

        ZSYQ_FEATURE_LAYER = new FeatureLayer(ZSYQ_FEATURE_SERVER, {
            mode: FeatureLayer.MODE_ONDEMAND,
            opacity: 0.7,
            outFields: ["*"]
        });

        ZSYQDY_FEATURE_LAYER = new FeatureLayer(ZSSTOREMINI_FEATURE_SERVER, {
            mode: FeatureLayer.MODE_ONDEMAND,
            opacity: 0.7,
            outFields: ["*"]
        });

        /**================END:全局基础=============**/


        /**================START:初始化操作=============**/

        /*======LOAD LAYERS=======*/
        map.addLayer(new TDTVectorLayer());
        map.addLayer(new TDTVectorAnnoLayer());

        // map.addLayer(XWQ_LAYER);
        map.addLayer(STREET_LAYER);
        map.addLayer(SQBZ_LAYER);

        map.addLayer(SQ_FEATURE_LAYER);
        map.addLayer(SQRJ_FEATURE_LAYER);
        map.addLayer(SQYQ_FEATURE_LAYER);
        map.addLayer(CG_FEATURE_LAYER);
        map.addLayer(ZSYQ_FEATURE_LAYER);
        map.addLayer(ZSYQDY_FEATURE_LAYER);

        /*======RENDERER APPLY ON FEATURES=======*/
        // SQ_FEATURE_LAYER.setRenderer(SQ_RENDERER);
        SQRJ_FEATURE_LAYER.setRenderer(SQRJ_RENDERER);
        SQYQ_FEATURE_LAYER.setRenderer(SQYQ_RENDERER);
        CG_FEATURE_LAYER.setRenderer(CG_RENDERER);
        ZSYQ_FEATURE_LAYER.setRenderer(ZSYQ_RENDERER);
        ZSYQDY_FEATURE_LAYER.setRenderer(ZSYQDY_RENDERER);

        /**================END:初始化操作=============**/

        /**=======START:MAP对象事件========**/

        map.on("zoom-end", function () {

            //0.MAP ZOOM
            if (map.getZoom() > 13) {
                XWQ_LAYER.setVisibility(false);
            } else if (map.getZoom() < 14) {
                XWQ_LAYER.setVisibility(true);
            }

            //1.INFOWINDOW
            map.infoWindow.hide();

        });

        map.on('mouse-drag-end', function () {
            //0.INFOWINDOW
            map.infoWindow.hide();
        });

        map.on("mouse-move", function (evt) {
            // 0.GET THE XYPOINT
            var mp = evt.mapPoint;
            console.log( mp.x.toFixed(8) + "," + mp.y.toFixed(8));

        });

        /**=======END:MAP对象事件========**/

        /**=======START:SQ对象事件========**/

        SQ_FEATURE_LAYER.on('mouse-move',function(evt){
            console.log(evt);
            //0.HL
            var graphic = evt.graphic;
            var SQ_PROMINENT_FILL = new  SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,SQ_BJ_LINE,PROMINENT_FILL_COLOR);
            graphic.setSymbol(SQ_PROMINENT_FILL);
            //1.infowindow
            // map.infoWindow.show(evt.mapPoint);
        });

        SQ_FEATURE_LAYER.on('mouse-out',function (evt) {
            //0.RETURN INIT COLOR
            var graphic = evt.graphic;
            var color = graphic.attributes.COLOR.split(",");
            var graphic_fill = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,SQ_LINE,new Color([color[0],color[1],color[2], 0.8]));
            graphic.setSymbol(graphic_fill);
        });

        SQ_FEATURE_LAYER.on('graphic-add',function (evt) {
            var graphic = evt.graphic;

            //0.INIT COLOR
            var color = graphic.attributes.COLOR.split(",");
            var graphic_fill = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,SQ_LINE,new Color([color[0],color[1],color[2], 0.8]));
            graphic.setSymbol(graphic_fill);

            //1.SHOW NAMES
            // var point = graphic.attributes.POINT.split(",");
            // // var infowindow_point = new Point(point[0],point[1], new SpatialReference({ wkid: 4326 }));
            // // var  INFO = new InfoWindow();
            // // INFO.setContent(graphic.attributes.SQMC);
            // // // map.infoWindow.setContent(graphic.attributes.SQMC);
            // // // map.infoWindow.show(infowindow_point);
            // // INFO.show(infowindow_point);
            //
            // var dialog = new TooltipDialog({
            //     style: "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100"
            // });
            // dialog.startup();
            // dialog.setContent(graphic.attributes.SQMC);
            // dijitPopup.open({
            //     popup:dialog,
            //     x:evt.pageX,
            //     y:evt.pageY
            // })
            //
            // //2.test
            // // var sq_infot = new InfoTemplate(graphic.attributes.SQMC);
            // // var mark_symbol = new SimpleMarkerSymbol();
            // // mark_symbol.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);
            // // mark_symbol.setSize(12);
            // // mark_symbol.setColor(ZSYQ_FILL_COLOR);
            // // var GRAPHIC_POINT = new Graphic(infowindow_point,mark_symbol,graphic.attributes).setInfoTemplate(sq_infot);
            // // map.graphics.add(GRAPHIC_POINT);
        });

        /**=======END:SQ对象事件========**/

        /**=======START:SQRJ对象事件========**/
        
        SQRJ_FEATURE_LAYER.on('graphic-add',function (evt) {
            //0.INIT COLOR
            var graphic = evt.graphic;
            var color = graphic.attributes.COLOR.split(",");
            var graphic_fill = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,SQRJ_LINE,new Color([color[0],color[1],color[2], 0.8]));
            graphic.setSymbol(graphic_fill);
        });
        
        SQRJ_FEATURE_LAYER.on('mouse-move',function (evt) {
            //0.HL
            var graphic = evt.graphic;
            var SQRJ_PROMINENT_FILL = new  SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,SQ_BJ_LINE,PROMINENT_FILL_COLOR);
            graphic.setSymbol(SQRJ_PROMINENT_FILL);
        });
        
        SQRJ_FEATURE_LAYER.on('mouse-out',function (evt) {
            //0.RETURN INIT COLOR
            var graphic = evt.graphic;
            var color = graphic.attributes.COLOR.split(",");
            var graphic_fill = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,SQRJ_LINE,new Color([color[0],color[1],color[2], 0.8]));
            graphic.setSymbol(graphic_fill);
        });

        /**=======END:SQRJ对象事件========**/

        /**=======START:ZSYQ对象事件========**/

        ZSYQ_FEATURE_LAYER.on('graphic-add',function (evt) {
            //0.INIT COLOR
            var graphic = evt.graphic;
            var color = graphic.attributes.COLOR.split(",");
            var graphic_fill = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,ZSYQ_LINE,new Color([color[0],color[1],color[2], 0.8]));
            graphic.setSymbol(graphic_fill);
        });

        ZSYQ_FEATURE_LAYER.on('mouse-move',function (evt) {
            //0.HL
            var graphic = evt.graphic;
            var ZSYQ_PROMINENT_FILL = new  SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,SQ_BJ_LINE,PROMINENT_FILL_COLOR);
            graphic.setSymbol(ZSYQ_PROMINENT_FILL);

        });

        ZSYQ_FEATURE_LAYER.on('mouse-out',function (evt) {
            //0.RETURN INIT COLOR
            var graphic = evt.graphic;
            var color = graphic.attributes.COLOR.split(",");
            var graphic_fill = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,ZSYQ_LINE,new Color([color[0],color[1],color[2], 0.8]));
            graphic.setSymbol(graphic_fill);

        });

        /**=======END:ZSYQ对象事件========**/

        /**=======START:CG对象事件========**/

        CG_FEATURE_LAYER.on('mouse-move',function (evt) {
            // //0.HL
            // var graphic = evt.graphic;
            // var CG_PROMINENT_FILL = new  SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,SQ_BJ_LINE,PROMINENT_FILL_COLOR);
            // graphic.setSymbol(CG_PROMINENT_FILL);
        });

        CG_FEATURE_LAYER.on('mouse-out',function (evt) {
            // CG_FEATURE_LAYER.setRenderer(CG_RENDERER);
        });

        /**=======END:CG对象事件========**/

        /** ======START:不同角色初始化加载=========== **/
        //INIT CENTPOINT
        // var CENTPOINT = sessionStorage.getItem("POINT");
        var ROLEID = sessionStorage.getItem('RID');
        // var ppp = CENTPOINT.split(",");
        switch (ROLEID.substring(0, 4)) {
            case '1000'://新吴区(默认显示区级和街道网格,有按钮可以显示所有网格)
                map.setLevel(13);
                map.centerAt(new Point(120.49580298, 31.50754201, new esri.SpatialReference({wkid: 4326})));
                SQ_FEATURE_LAYER.setVisibility(false);
                SQRJ_FEATURE_LAYER.setVisibility(false);
                SQYQ_FEATURE_LAYER.setVisibility(false);
                CG_FEATURE_LAYER.setVisibility(false);
                ZSYQ_FEATURE_LAYER.setVisibility(false);
                ZSYQDY_FEATURE_LAYER.setVisibility(false);
                break;
        }
        /** =====END:不同角色初始化加载=========== **/

        /**=====START:图形编辑(保存 & 删除 & 修改)=======**/

        SQ_FEATURE_LAYER.on("click", function (evt) {
            var graphic = evt.graphic;
            var attr = graphic.attributes;
            map.infoWindow.setTitle("社区网格名称：" + attr.SQMC);
            var content = "<div id='infoRemark'><p>所在区:" + attr.QMC + "</p><p>所在街道:" + attr.JDMC + "</p><p>本网格名称:" + attr.SQMC + "</p><p>备注:" + attr.REMARK + "</p><button class='deleteBtn' id='deleteGird' data-type='community' data-objectid='" + attr.OBJECTID + "'>删除该网格</button><button class='updateBtn' id='updateGird' data-objectid=" + attr.OBJECTID + ">编辑该网格</button></div>";
            map.infoWindow.setContent(content);
            map.infoWindow.show(evt.mapPoint);
        });

        SQRJ_FEATURE_LAYER.on("click", function (evt) {
            var graphic = evt.graphic;
            var attr = graphic.attributes;
            map.infoWindow.setTitle("社区辖居村网格名称：" + attr.RJMC);
            var content = "<div id='infoRemark'><p>所在区:" + attr.QMC + "</p><p>所在街道:" + attr.JDMC + "</p><p>所在社区:" + attr.SQMC + "</p><p>本网格名称:" + attr.RJMC + "</p><p>备注:" + attr.REMARK + "</p><button class='deleteBtn' id='deleteGird' data-type='communitymini' data-objectid='" + attr.OBJECTID + "'>删除该网格</button><button class='updateBtn' id='updateGird' data-objectid=" + attr.OBJECTID + ">编辑该网格</button></div>";
            map.infoWindow.setContent(content);
            map.infoWindow.show(evt.mapPoint);
        });

        SQYQ_FEATURE_LAYER.on("click", function (evt) {
            var graphic = evt.graphic;
            var attr = graphic.attributes;
            map.infoWindow.setTitle("社区辖园区网格名称：" + attr.STORENAME);
            var content = "<div id='infoRemark'><p>所在区:" + attr.DISTRICTNAME + "</p><p>所在街道:" + attr.STREETNAME + "</p><p>所在社区:" + attr.COMMUNITYNAME + "</p><p>本网格名称:" + attr.STORENAME + "</p><p>备注:" + attr.REMARK + "</p><button class='deleteBtn' id='deleteGird' data-type='communitystore' data-objectid='" + attr.OBJECTID + "'>删除该网格</button><button class='updateBtn' id='updateGird' data-objectid=" + attr.OBJECTID + ">编辑该网格</button></div>";
            map.infoWindow.setContent(content);
            map.infoWindow.show(evt.mapPoint);
        });

        CG_FEATURE_LAYER.on("click", function (evt) {
            var graphic = evt.graphic;
            var attr = graphic.attributes;
            map.infoWindow.setTitle("城市管理网格名称：" + attr.ROODMININAME);
            var content = "<div id='infoRemark'><p>所在区:" + attr.DISTRICTNAME + "</p><p>所在街道:" + attr.STREETNAME + "</p><p>所在社区:" + attr.COMMUNITYNAME + "</p><p>本网格名称:" + attr.ROODMININAME + "</p><p>备注:" + attr.REMARK + "</p><button class='deleteBtn' id='deleteGird' data-type='rood' data-objectid='" + attr.OBJECTID + "'>删除该网格</button><button class='updateBtn' id='updateGird' data-objectid=" + attr.OBJECTID + ">编辑该网格</button></div>";
            map.infoWindow.setContent(content);
            map.infoWindow.show(evt.mapPoint);
        });

        ZSYQ_FEATURE_LAYER.on("click", function (evt) {
            var graphic = evt.graphic;
            var attr = graphic.attributes;
            map.infoWindow.setTitle("专属园区网格名称：" + attr.YQMC);
            var content = "<div id='infoRemark'><p>所在区:" + attr.QMC + "</p><p>所在街道:" + attr.JDMC + "</p><p>所在社区:" + attr.SQMC + "</p><p>本网格名称:" + attr.YQMC + "</p><p>备注:" + attr.REMARK + "</p><button class='deleteBtn' id='deleteGird' data-type='zsstore' data-objectid='" + attr.OBJECTID + "'>删除该网格</button><button class='updateBtn' id='updateGird' data-objectid=" + attr.OBJECTID + ">编辑该网格</button></div>";
            map.infoWindow.setContent(content);
            map.infoWindow.show(evt.mapPoint);
        });

        ZSYQDY_FEATURE_LAYER.on("click", function (evt) {
            var graphic = evt.graphic;
            var attr = graphic.attributes;
            map.infoWindow.setTitle("专属园区管辖网格名称：" + attr.ZSTORENAME);
            var content = "<div id='infoRemark'><p>所在区:" + attr.DISTRICTNAME + "</p><p>所在街道:" + attr.STREETNAME + "</p><p>所在社区:" + attr.COMMUNITYNAME + "</p><p>所在园区:" + attr.ZSSTORENAME + "</p><p>本网格名称:" + attr.NAME + "</p><p>备注:" + attr.REMARK + "</p><button class='deleteBtn' id='deleteGird' data-type='zsstoremini' data-objectid='" + attr.OBJECTID + "'>删除该网格</button><button class='updateBtn' id='updateGird' data-objectid=" + attr.OBJECTID + ">编辑该网格</button></div>";
            map.infoWindow.setContent(content);
            map.infoWindow.show(evt.mapPoint);
        });

        /**=====END:图形编辑(保存 & 删除 & 修改)=======**/

        /**==========START:画网格 & 填写信息 & 存取==========**/

        graphicsLayer = new GraphicsLayer();
        map.addLayer(graphicsLayer);
        $("#btnhua").on('click', function () {
            try {
                map.infoWindow.hide();
                addPolygon(graphicsLayer);
            } catch (e) {
                console.log(e);
            }
        });

        //SHOW THE WINDOW
        graphicsLayer.on("click", function (evt) {
            console.log(evt);
            newGraphic = evt.graphic;
            $("#mapbox").show();
            var id = "1055";
            $.ajax({
                type: 'GET',
                url: queryCommunity,
                data: {"id": id},
                dataType: 'json',
                success: function (result) {
                    var html_community = "";
                    for (var i = 0; i < result.length; i++) {
                        html_community += "<option value='" + result[i].SQDM + "'>" + result[i].SQMC + "</option>"
                    }
                    $("#shequselect").append(html_community);
                }
            });
        });
        /**==========END:画网格 & 填写信息 & 存取==========**/
    });

