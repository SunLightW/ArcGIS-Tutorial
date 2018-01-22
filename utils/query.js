
function QueryGraphicObject(server, target, param) {

    console.log("URL:"+server);
    console.log("字段:"+target);
    console.log("参数:"+param);

    //创建属性查询对象
    var findTask = new esri.tasks.FindTask(server);
    //创建属性查询参数
    var findParams = new esri.tasks.FindParameters();
    findParams.returnGeometry = true;
    //对哪一个图层进行属性查询
    findParams.layerIds = [0];
    //查询的字段
    findParams.searchFields = [target];
    //searchText和searchFields结合使用
    findParams.searchText = param;
    //执行查询对象
    findTask.execute(findParams, ShowFindGraphicResult);
}

function ShowFindGraphicResult(queryResult) {
    console.log(queryResult);
    if(queryResult.length == 0) {
        console.log("There is no result!!!");
        return;
    }

    if(queryResult.length >= 1) {
        console.log(queryResult);
        return queryResult;
    }
}