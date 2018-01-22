/**用户操作**/
$(function () {
    var SAVETYPE;

    /**=======START:开启画图 & 选择框逻辑===========**/
    $("#switchEdit").on("click", function () {
        if ($(this).data("status") == "off") {
            //如果当前是关的
            $("#btnhua").show();
            $(this).data("status", "on");
            $(this).html("关闭编辑");
        } else {
            //如果当前是开的
            $(this).data("status", "off");
            $("#btnhua").hide();
            $(this).html("开启编辑");
            if (toolbar && toolbar.deactivate) {
                toolbar.deactivate();
            }
        }
        try {
            map.infoWindow.hide();
        } catch (e) {
            console.log(e);
        }
    });

    /*显示设置*/
    $("#showcom").click(function () {
        if ($(this).prop("checked")) {
            SQ_FEATURE_LAYER.setVisibility(true);
            //CHECK THE SQRJ
            if ($("#showcommini").prop("checked")) {
                SQ_FEATURE_LAYER.setRenderer(SQ_BJ_RENDERER);
            }
        } else {
            SQ_FEATURE_LAYER.setVisibility(false);
            map.infoWindow.hide();
        }
    });
    $("#showcommini").click(function () {
        if ($(this).prop("checked")) {
            SQRJ_FEATURE_LAYER.setVisibility(true);
        } else {
            SQRJ_FEATURE_LAYER.setVisibility(false);
            map.infoWindow.hide();
        }
    });
    $("#showcomstore").click(function () {
        if ($(this).prop("checked")) {
            SQYQ_FEATURE_LAYER.setVisibility(true);
        } else {
            SQYQ_FEATURE_LAYER.setVisibility(false);
            map.infoWindow.hide();
        }
    });
    $("#showrood").click(function () {
        if ($(this).prop("checked")) {
            CG_FEATURE_LAYER.setVisibility(true);
        } else {
            CG_FEATURE_LAYER.setVisibility(false);
            map.infoWindow.hide();
        }
    });
    $("#showstore").click(function () {
        if ($(this).prop("checked")) {
            ZSYQ_FEATURE_LAYER.setVisibility(true);
        } else {
            ZSYQ_FEATURE_LAYER.setVisibility(false);
            map.infoWindow.hide();
        }
    });
    $("#showstoreall").click(function () {
        if ($(this).prop("checked")) {
            ZSYQDY_FEATURE_LAYER.setVisibility(true);
        } else {
            ZSYQDY_FEATURE_LAYER.setVisibility(false);
            map.infoWindow.hide();
        }
    });

    // 单选框
    $("#community").on('click',function () {//创建社区
        var ischeck =  $('input:radio[id="community"]:checked').val();
        if (ischeck){
            $("#shequbaselabel").css('display','none');
            $("#baselabel").css('display','none');
            SAVETYPE = 'community';
        }
    });
    $("#communitymini").on('click',function () {//创建社区下居村
        var ischeck =  $('input:radio[id="communitymini"]:checked').val();
        if (ischeck){
            $("#shequbaselabel").css('display','none');
            $("#baselabel").css('display','block');
            SAVETYPE = 'communitymini';
        }
    });
    $("#communitystore").on('click',function () {//创建社区下园区
        var ischeck =  $('input:radio[id="communitystore"]:checked').val();
        if (ischeck){
            $("#shequbaselabel").css('display','none');
            $("#baselabel").css('display','block');
            SAVETYPE = 'communitystore';
        }
    });
    $("#rood").on('click',function () {//创建城市管理
        var ischeck =  $('input:radio[id="rood"]:checked').val();
        if (ischeck){
            $("#shequbaselabel").css('display','block');
            $("#baselabel").css('display','none');
            SAVETYPE = 'rood';
        }
    });
    $("#zsstore").on('click',function () {//创建专属园区
        var ischeck =  $('input:radio[id="zsstore"]:checked').val();
        if (ischeck){
            $("#shequbaselabel").css('display','block');
            $("#baselabel").css('display','none');
            SAVETYPE = 'zsstore';
        }
    });
    $("#zsstoremini").on('click',function () {//创建专属园区最小单元
        var ischeck =  $('input:radio[id="zsstoremini"]:checked').val();
        if (ischeck){
            $("#shequbaselabel").css('display','block');
            $("#baselabel").css('display','block');
            SAVETYPE = 'zsstoremini';
        }
    });
    /**=======END:开启画图 & 选择框逻辑===========**/


    /**=========START:图形操作(保存 & 取消保存 & 删除)===========**/

    /****取消保存****/
    $("#cancelGrid").click(function () {
        //取消
        $('#mapbox').hide();
        graphicsLayer.remove(newGraphic);
        toolbar.deactivate();
    });


    /*********保存***************/
    $('.saveGrid').click(function () {
        //1.获取相关参数
        var ACCOUNT = sessionStorage.getItem('ACCOUNT');
        var PASSWORD = sessionStorage.getItem('PASSWORD');
        var QMC = "新吴区";
        var QDM = "320214";
        var JDMC = "鸿山街道";
        var JDDM = "320214055";
        var option = $("#shequselect option:selected");
        var SQMC = option.text();//社区名称
        var SQDM = option.val();//社区代码
        var ZSNAME =$.trim($("#shequgridName").val());
        var MINNAME =$.trim($("#gridName").val());
        var REMARK = $.trim( $("#gridRemark").val());
        //获取坐标
        var geometry = newGraphic.geometry;
        if (geometry.isSelfIntersecting()) {
            alert("您画网格存在相交的情况。");
            return;
        }
        var rings = geometry.rings[0];//这是个三维数组
        var coords = [];
        for (var i = 0; i < rings.length; i++) {
            var coord = rings[i].join(",");
            coords.push(coord);
        }
        var coordsString = coords.join(";");
        console.log(coordsString);
        //2.发送参数
        var data = {
            "QMC":QMC,
            "QDM":QDM,
            "JDMC": JDMC,
            "JDDM": JDDM,
            "SQMC": SQMC,//社区名称
            "SQDM": SQDM,//社区代码
            "ZSNAME":ZSNAME,
            "MINNAME":MINNAME,//基本网格
            "COORDS": coordsString.toString(),
            "account": ACCOUNT,
            "password": PASSWORD,
            "SAVETYPE": SAVETYPE,
            "REMARK":REMARK
        };
        if (data.COORDS.trim().length < 1) {
            bombBox("坐标获取失败！", "faile");
            return;
        }
        console.log(JSON.stringify(data));

        //4.发送请求
        $.post(
            addUrl,
            {"param": JSON.stringify(data)}).done(function (res) {
                //成功
            if (res.status == 0 || res.status == '0') {
                //去掉画图图层的图形
                graphicsLayer.remove(newGraphic);
                bombBox("保存成功", "success");
            } else {//失败
                var errMsg = res.msg;
                if (errMsg.indexOf("dberror") > -1) {
                    errMsg = "该图形无法保存！"
                }
                bombBox("保存失败:" + errMsg, "faile");
                //去掉画图图层的图形
                // graphicsLayer.remove(newGraphic);
            }
        }).fail(function () {
            bombBox("保存失败", "faile");
            //去掉画图图层的图形
            graphicsLayer.remove(newGraphic);
        }).always(function () {
            try {
                $("#gridName").val("");
                $("#gridRemark").val("");
                map.infoWindow.hide();
            } catch (e) {
                console.log(e);
            }

        });
        $('.mapbox').hide();
    });

    /*********删除***************/

    $("#map").on("click", "#deleteGird", function () {
        var objectid = $(this).data("objectid");
        var deltype = $(this).data("type");
        var delUrl;
        if (deltype == "community"){
            delUrl = deleteCommunityUrl;
        }
        if (deltype == "communitymini"){
            delUrl = deleteMINIUrl;
        }
        if (deltype == "communitystore"){
            delUrl = deleteStoreUrl;
        }
        if (deltype == "rood"){
            delUrl = deleteRoodUrl;
        }
        if (deltype == "zsstore"){
            delUrl = deleteZsStoreUrl;
        }
        if (deltype == "zsstoremini"){
            delUrl = deleteZsStoreMiniUrl;
        }

        $.post(
            delUrl,
            {"objid": objectid}).done(function (res) {
            if (res.status == "0" || res.status == 0) {
                bombBox("删除成功！", "success");
                map.infoWindow.hide();
            } else {
                bombBox("删除失败！", "faile");
            }
        }).fail(function () {
            bombBox("删除失败！", "faile");
        });
    });


    function bombBox(msg, type) {
        var html = '';
        html += '<div class="bombBox">' + '<div class="bom_box">' + '<div class="title fixed">' + '<span>消息提示</span>' + '<a href="javascript:void(0)"></a>' + '</div>' + '<div class="message">' + '<div class="' + type + '"></div>' + '<p>' + msg + '</p>'
        '</div>' + '</div>' + '</div>   ';
        $('body').append(html);
        $(".bombBox .bom_box ").delegate('a', 'click', function () {
            $('.bombBox').remove();
        })
        setTimeout(function () {
            $('.bombBox').remove();
        }, 1500)
    }

    /*******查询***********/
    $("#search_sq").on('click',function () {
        var server = SQ_SERVER;
        var target = "COMMUNITYNAME";
        var param = "鸿运苑第二社区居委会";
        QueryGraphicObject(server,target,param);
    })
});
