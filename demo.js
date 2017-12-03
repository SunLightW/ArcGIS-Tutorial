var map;//地图容器
var cam_layer;//摄像机图层
var ele_layer;//电梯图层
var wangge_layer;//网格图层
var pointSymbol;//点样式
var lineSymbol;//线样式
var fill;//面样式
jQuery(function () {
    require([
            "esri/map",//Map容器

            "esri/SpatialReference",//地理坐标(4326)

            "esri/layers/ArcGISDynamicMapServiceLayer",//图层--动态图层
            "esri/layers/ArcGISImageServiceLayer",//图层--
            "esri/layers/ArcGISImageServiceVectorLayer",//图层--
            "esri/layers/ArcGISTiledMapServiceLayer",//图层--
            "esri/layers/CSVLayer",//图层--
            "esri/layers/DataAdapterFeatureLayer",//图层--
            "esri/layers/DynamicMapServiceLayer",
            "esri/layers/DynamicLayerInfo",//图层--
            "esri/layers/FeatureLayer",//图层--
            "esri/layers/GraphicsLayer",//图层--客户端图形层

            "esri/graphic",//图形对象

            "esri/toolbars/draw",//工具--绘画

            "esri/geometry/Point",//几何图形--点
            "esri/geometry/Multipoint",//几何图形--多点
            "esri/geometry/Polyline",//几何图形--折线
            "esri/geometry/Polygon",//几何图形--多边形
            "esri/geometry/Circle",//几何图形--圆

            "esri/symbols/SimpleMarkerSymbol",//符号--简单点符号
            "esri/symbols/SimpleLineSymbol",//符号--简单线符号
            "esri/symbols/SimpleFillSymbol",//符号--简单面符号

            "esri/tasks/FindTask",
            "esri/tasks/FindParameters",

            "esri/tasks/query",
            "esri/tasks/QueryTask"


            // "dojo/domReady!"
        ],
        function(
            Map,

            SpatialReference,

            ArcGISDynamicMapServiceLayer,
            ArcGISImageServiceLayer,
            ArcGISImageServiceVectorLayer,
            ArcGISTiledMapServiceLayer,
            CSVLayer,
            DataAdapterFeatureLayer,
            DynamicMapServiceLayer,
            DynamicLayerInfo,
            FeatureLayer,
            GraphicsLayer,

            Graphic,

            Draw,

            Point,
            Multipoint,
            Polyline,
            Polygon,
            Circle,

            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,

            FindTask,
            FindParameters,

            Query,
            QueryTask){
            //创建地图对象
            map = new Map("mappanel",{
                logo:false,
                slider:false,
                showTooltips:true
            });
            //添加底图和相关属性
            map.addLayer(new TDTVectorLayer());
            map.addLayer(new TDTVectorAnnoLayer());
            map.setLevel(11);
            map.centerAt(new Point(120.29913,31.57723,new esri.SpatialReference({ wkid: 4326 })));

            /////////////////////图层切换/////////////////////////////////////
            //动态图层
            cam_layer = new ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/wxarcgis/camera/MapServer");
            ele_layer = new ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/wxarcgis/elebox/MapServer");
            wangge_layer = new ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/wxarcgis/wangge/MapServer",{"opacity":0.5});

            //网格
            $("#wg_lay").click(function () {
                var a = $("#wg_lay").is(':checked');
                if (a  === true){
                    map.addLayer(wangge_layer);
                }
                else {
                    map.removeLayer(wangge_layer);
                }
            });

            //摄像头
            $("#cam_lay").click(function () {
                var a = $("#cam_lay").is(':checked');
                if (a  === true){
                    map.addLayer(cam_layer);
                }
                else {
                    map.removeLayer(cam_layer);
                }
            });

            //电梯
            $("#dt_lay").click(function () {
                var a = $("#dt_lay").is(':checked');
                if (a  === true){
                    map.addLayer(ele_layer);
                }
                else {
                    map.removeLayer(ele_layer);
                }
            });

            ////////////////////////按条件显示图层信息////////////////
            // //定义图层属性
            // var cam_layerDefinitions = [];
            // //相当于SQL作用(人口大于100的）
            // cam_layerDefinitions[0] = "??????";
            // //将属性添加到图层中
            // cam_layer.setLayerDefinitions(cam_layerDefinitions);





            ////////////////////绘点线面//////////////////////////

            //样式
            lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 3);//线样式
            pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,10, lineSymbol, new dojo.Color([255, 0, 0]));//点样式
            fill = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol,  new dojo.Color([255, 0, 0]));//面样式

            //根据输入的坐标画点
            $("#jinwei").click(function () {
                var graphicsLayer = new GraphicsLayer();
                var x = $("#x").val();
                var y = $("#y").val();
                // 创建点对象
                var point = new Point(parseFloat(x),parseFloat(y),new SpatialReference({wkid:4326}));
                //创建图形对象
                var graphic = new Graphic(point,pointSymbol);
                //将图形放到图形图层后添加到map中
                graphicsLayer.add(graphic);
                map.addLayer(graphicsLayer);
            });


            // 手工画点
            $("#point").click(function () {
                //客户端绘画图层
                var graphicsLayer = new GraphicsLayer();
                map.addLayer(graphicsLayer);
                //创建一个图形
                var gemetry;
                var graphic;

                gemetry =  new Point(new SpatialReference({wkid:4326}));


                //绘画对象
                var draw_toolbar = new Draw(graphicsLayer,{
                    showTooltips:true,
                    tooltipOffset:20,
                    drawTime:90
                });


                draw_toolbar.activate(Draw.Point);
                draw_toolbar.finishDrawing();
            });
// //
//         //手工画线
//         $("#line").click(function () {
//
//         });
//
//         //手工画面
//         $("#fill").click(function () {
//
//         });



            ////////////////////////////查询/////////////////////////
            // var cam_service = "http://localhost:6080/arcgis/rest/services/wxarcgis/camera/MapServer";
            // var findTask = new FindTask(cam_service);
            // var findParams = new FindParameters();
            // $("#btn").click(function () {
            //
            // })

            cam_queryTask = new QueryTask("http://localhost:6080/arcgis/rest/services/wxarcgis/camera/MapServer");
            cam_query = new Query();
            cam_query.returnGeometry = true;
            // cam_query.outFields =


            //////////////////小工具/////////////
            // 设置图层透明度

        });

});
