

// var rootPath = "http://192.168.88.85:8082/grid/";
var rootPath = "http://wyq9995.asuscomm.com:8082/grid/";
// var rootPath = "http://192.168.88.85:8081/grid/";
// var rootPath = "http://localhost:8080/grid/";
// var rootPath = "http://wyq9995.asuscomm.com:8081/grid/";


/**========接口API==========**/
//登录
var loginUrl = rootPath+"user/loginUser";
//保存网格
var addUrl = rootPath+"saveGrid";
//查询社区名称
var queryCommunity = rootPath + 'showGnames';
//删除
var deleteCommunityUrl = rootPath+"delSqGrid";//删除社区
var deleteMINIUrl = rootPath+"delDyGrid";//删除居村
var deleteStoreUrl = rootPath+"delStoreGrid";//删除商区
var deleteRoodUrl = rootPath+"delRoodGrid";//删除道路
var deleteZsStoreUrl = rootPath+"delZsStoreGrid";//删除园区专属网格
var deleteZsStoreMiniUrl = rootPath+"delZsStoreMiniGrid";//删除园区专属网格下属最小单元网格


/**=======图层服务API & 创建动态图层=======**/
// var DISTRICT_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/DISTRICT/MapServer";//新吴区服务API
// var STREET_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/STREETS/MapServer";//街道服务API
// var COMMUNITY_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/COMMUNITY/MapServer";//社区服务API
// var MINI_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/MINIWANGGE/MapServer";//居村服务API
// var ROOD_SERVER ="http://192.168.88.85:6080/arcgis/rest/services/WANGGE/ROOD/MapServer";//道路服务API
// var STORE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/STORE/MapServer";//商店服务API
//
// var DISTRICT_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/DISTRICT/MapServer";//新吴区服务API
// var STREET_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/STREETS/MapServer";//街道服务API
// var COMMUNITY_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/COMMUNITY/MapServer";//社区服务API
// var MINI_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/MINIWANGGE/MapServer";//居村服务API
// var ROOD_SERVER ="http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/ROOD/MapServer";//道路服务API
// var STORE_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/STORE/MapServer";//商店服务API

// var COMMUNITY_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/COMMUNITY/MapServer/0";//社区服务API
// var MINI_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/MINIWANGGE/MapServer/0";//社区下居村迷你网格服务API
// var STORE_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/STORE/MapServer/0";//社区下园区网格服务API
// var ROOD_FEATURE_SERVER ="http://192.168.88.85:6080/arcgis/rest/services/WANGGE/ROOD/MapServer/0";//城市管理类服务API
// var ZSSTORE_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/ZSSTORE/MapServer/0";//专属园区网格
// var ZSSTOREMINI_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/ZSSTOREMINI/MapServer/0";//专属园区最小网格

// var COMMUNITY_FEATURE_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/COMMUNITY/MapServer/0";//社区服务API
// var MINI_FEATURE_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/MINIWANGGE/MapServer/0";//居村服务API
// var ROOD_FEATURE_SERVER ="http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/ROOD/MapServer/0";//道路服务API
// var STORE_FEATURE_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/STORE/MapServer/0";//商店服务API

// /***********NEW & TEST*************/
// // 动态服务
// var DISTRICT_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/DISTRICT/MapServer";//新吴区服务API
// var STREET_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/STREETS/MapServer";//街道服务API
// var SQ_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WX/SQ/MapServer";
// var SQBZ_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WX/SQBZ/MapServer";
// // var SQRJ_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WX/SQRJ/MapServer";
// // var ZSYQ_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WX/ZSYQ/MapServer";
//
// //特征服务
// var SQ_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WX/SQ/MapServer/0";
// var SQRJ_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WX/SQRJ/MapServer/0";
// var ZSYQ_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WX/ZSYQ/MapServer/0";
//
// var ROOD_FEATURE_SERVER ="http://192.168.88.85:6080/arcgis/rest/services/WANGGE/ROOD/MapServer/0";//道路服务API
// var STORE_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/STORE/MapServer/0";//商店服务API
// var ZSSTOREMINI_FEATURE_SERVER = "http://192.168.88.85:6080/arcgis/rest/services/WANGGE/ZSSTOREMINI/MapServer/0";//专属园区最小网格


/***********NEW & FUNCTIONAL*************/
// 动态服务
var DISTRICT_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/DISTRICT/MapServer";//新吴区服务API
var STREET_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/STREETS/MapServer";//街道服务API
var SQ_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WX/SQ/MapServer";
var SQBZ_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WX/SQBZ/MapServer";
// var SQRJ_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WX/SQRJ/MapServer";
// var ZSYQ_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WX/ZSYQ/MapServer";

//特征服务
var SQ_FEATURE_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WX/SQ/MapServer/0";
var SQRJ_FEATURE_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WX/SQRJ/MapServer/0";
var ZSYQ_FEATURE_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WX/ZSYQ/MapServer/0";

var ROOD_FEATURE_SERVER ="http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/ROOD/MapServer/0";//道路服务API
var STORE_FEATURE_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/STORE/MapServer/0";//商店服务API
var ZSSTOREMINI_FEATURE_SERVER = "http://wyq9995.asuscomm.com:6080/arcgis/rest/services/WANGGE/ZSSTOREMINI/MapServer/0";//专属园区最小网格