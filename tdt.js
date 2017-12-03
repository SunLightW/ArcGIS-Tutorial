////////////////////////////////////////天地图加载/////////////////////////////////////////
var _serverUrls = [
    "http://t0.tianditu.cn/", "http://t1.tianditu.cn/",
    "http://t2.tianditu.cn/", "http://t3.tianditu.cn/",
    "http://t4.tianditu.cn/", "http://t5.tianditu.cn/",
    "http://t6.tianditu.cn/", "http://t7.tianditu.cn/"];
var _lodsInfo = [
    {"level": 0, "scale": 590995197.141668, "resolution": 1.40625},
    {"level": 1, "scale": 295497598.570834, "resolution": 0.703125},
    {"level": 2, "scale": 147748799.285417, "resolution": 0.3515625},
    {"level": 3, "scale": 73874399.6427087, "resolution": 0.17578125},
    {"level": 4, "scale": 36937199.8213544, "resolution": 0.087890625},
    {"level": 5, "scale": 18468599.9106772, "resolution": 0.0439453125},
    {"level": 6, "scale": 9234299.95533859, "resolution": 0.02197265625},
    {"level": 7, "scale": 4617149.97766929, "resolution": 0.010986328125},
    {"level": 8, "scale": 2308574.98883465, "resolution": 0.0054931640625},
    {"level": 9, "scale": 1154287.49441732, "resolution": 0.00274658203125},
    {"level": 10, "scale": 577143.747208662, "resolution": 0.001373291015625},
    {"level": 11, "scale": 288571.873604331, "resolution": 0.0006866455078125},
    {"level": 12, "scale": 144285.936802165, "resolution": 0.00034332275390625},
    {"level": 13, "scale": 72142.9684010827, "resolution": 0.000171661376953125},
    {"level": 14, "scale": 36071.4842005414, "resolution": 8.58306884765629E-05},
    {"level": 15, "scale": 18035.7421002707, "resolution": 4.29153450388056E-05},
    {"level": 16, "scale": 9017.87105013534, "resolution": 2.14576725194028E-05},
    {"level": 17, "scale": 4508.93552506767, "resolution": 1.07288362597014E-05},
    {"level": 18, "scale": 2254.46776253384, "resolution": 5.36441812985071E-06},
    {"level": 19, "scale": 1127.23388126692, "resolution": 2.68220906492536E-06},
    {"level": 20, "scale": 563.61694063346, "resolution": 1.34110453246268E-06}
];

//构造器
function TDTWmtsTileLayer(server, layer, localUrl) {
    dojo.declare("ogc.wmts.tdtlayer", esri.layers.TiledMapServiceLayer, {
        id: "ogc.wmts.tdtlayer",
        constructor: function (id) {
            this.id = id || this.id;
            this.spatialReference = new esri.SpatialReference({
                wkid: 4326
            });

            this.initialExtent = new esri.geometry.Extent(-180, -90, 180, 90, this.spatialReference);
            this.fullExtent = new esri.geometry.Extent(-180, -90, 180, 90, this.spatialReference);

            this.tileInfo = new esri.layers.TileInfo({
                "dpi": "96",
                "format": "image/png",
                "compressionQuality": 0,
                "spatialReference": { "wkid": 4326 },
                "rows": 256,
                "cols": 256,
                "origin": { "x": -180, "y": 90 },
                "lods": _lodsInfo
            });
            this.loaded = true;
            this.onLoad(this);
        },

        getTileUrl: function (level, row, col) {
            var url = "";
            if (level < 18) {
                var index = Math.floor(Math.random() * 8);    // _serverUrls.length==8
                url = _serverUrls[index] + server + "/wmts?service=wmts&request=GetTile&version=1.0.0&style=default&format=tiles&tileMatrixSet=c" +
                    "&LAYER=" + layer + "&TileMatrix=" + level + "&TileRow=" + row + "&TileCol=" + col;
            }
            else {
                url = localUrl + "?service=wmts&request=GetTile&version=1.0.0&style=jsvector&format=image/png&tileMatrixSet=sss" +
                    "&LAYER=0&TileMatrix=" + level + "&TileRow=" + row + "&TileCol=" + col;
            }
            return url;
        }
    });
    return new ogc.wmts.tdtlayer(server);
}

function TDTVectorLayer() {
    return TDTWmtsTileLayer("vec_c", "vec", "http://mapwx.com.cn/wmtsservice/wuxi_vector");
}
function TDTVectorAnnoLayer() {
    return TDTWmtsTileLayer("cva_c", "cva", "http://mapwx.com.cn/wmtsservice/wuxi_anno_vector");
}
function TDTImageLayer() {
    return TDTWmtsTileLayer("img_c", "img", "http://mapwx.com.cn/wmtsservice/wuxi_raster");
}
function TDTImageAnnoLayer() {
    return TDTWmtsTileLayer("cia_c", "cia", "http://mapwx.com.cn/wmtsservice/wuxi_anno_raster");
}