

angular.module('starter.controllers', ['ionic'])
    .controller('pickCtrl', ['$rootScope', '$scope', '$ionicSlideBoxDelegate', '$ionicPopup', '$timeout','$resource', 'util', 'Tip', function ($rootScope, $scope, $ionicSlideBoxDelegate, $ionicPopup, $timeout, $resource, util, Tip) {                 //选球控制器


       if(configData.awardGroupRetStatus == 0){
           var aG = configData.awardGroups;
           $scope.bonus = {'choice': +configData.awardGroups[configData.awardGroups.length - 1].awardGroupId};
           var bonusHtml = "<ion-list class='select-jjz'>";
           for (var a in aG) {
               bonusHtml += ('<ion-radio  ng-model="bonus.choice" ng-value="'+aG[a].awardGroupId +'">' + aG[a].awardName.replace('奖金组', '') + '</ion-radio>');
           }
           bonusHtml += '</ion-list>'+"<hr class='clear '><p>注: 奖金组一经设定,不可修改</p>";
           $ionicPopup.confirm({
               template: bonusHtml,
               title: '温馨提示',
               subTitle: '请选择一个奖金组,便于您投注时使用。',
               scope:$scope,
               buttons: [
                   {
                       text: '<b>确定</b>',
                       type: 'button-positive',
                       onTap: function (e) {
                           $resource(saveBetAwardUrl).get({
                               "awardGroupId": $scope.bonus.choice
                           }, function (obj) {
                               if(obj.isSuccess == "1"){
                                   for(var i = 0; i<aG.length; i++){
                                       if(aG[i].awardGroupId ==  $scope.bonus.choice){
                                           $rootScope.award = aG[i].awardName.replace('奖金组', '');
                                           //console.log($rootScope.award);
                                       }
                                   }
                                   new Tip('奖金组设置成功').start();
                               }else{
                                   new Tip('奖金组设置失败').start();
                                   $timeout(function(){
                                       location.reload();
                                   },500);
                               }
                           });

                       }
                   },
                   {
                       text: '取消',
                       type: 'button-default',
                       onTap: function (e) {
                           location.reload();
                       }
                   }
               ]
           });
       }




        $scope.currentMethod = configData.defaultMethod;              //当前方法 xuanwu.renxuanwuzhongwu.fushi 
        $scope.currentMethodTitle = phoenix.Games.N115.Config.pros.getTitleByName($scope.currentMethod).join('');      //获取默认标题
        $scope.poptypeshow = false;         //标题箭头方向
        $scope.menuShow = false;            //右侧菜单是否显示
        $scope.historyShow = false;         //显示历史记录
        $scope.awardGroupRetStatus = configData.awardGroupRetStatus;    //奖金返点
        $scope.gameMethodsGroup = configData.gameMethods;    //玩法组
        $scope.choosedType = 4;             //默认类型
        $scope.singleMode = false;        //是否是单式

        $scope.count = 0;               //注数
        $rootScope.unitPrice = 2;       //单价
        $scope.multiple = 1;            //倍数
        $scope.hasBall = false;         //是否选择了球

        $scope.extraisShow = true;      //倍数选择栏，ng-hide
        $rootScope.term = +configData.term;   //期数



        $scope.historyRecord = configData.records;     //最近10条记录



        $rootScope.globalCount = 0;     //全局注数

        $rootScope.isEditor = false;    //是否是编辑状态


        $rootScope.basket = {};             //号码篮，全局数据模型
        $rootScope.betsCounts = 0;           //总共的注数
        $rootScope.betsMoney = 0;           //总共的金额

        $scope.minute = '--';           //剩余开奖的分钟数
        $scope.second = '--';           //剩余开奖的秒数
        $scope.time = new Date();
        var time = util.getTimeout();


        var timer = setInterval(function () {  
            if(time == false){
                clearInterval(timer);
                return;
            }         
            if (time <= 0) {
                new Tip('当前销售截止,进入下期购买').start();
                $rootScope.term++;
                time = util.getTimeout();
            } else {
                $scope.minute = Math.floor(time / 60);
                $scope.second = time % 60;
                if ($scope.minute < 10) {
                    $scope.minute = '0' + $scope.minute;
                }
                if ($scope.second < 10) {
                    $scope.second = '0' + $scope.second;
                }
                $scope.$apply();
                time--;
            }
        }, 1000);


//---------------------------------------------单式---------------------------------------//
        //单式
        $scope.beforesubmited = true;
        $scope.ShowtextareaTip = true;
        $scope.hasDanshiErrror = false;
        $scope.input = '';
        $scope._input = '';

        $scope.textareaFocus = function () {   //聚焦
            $scope.isFocus = true;
            $scope.ShowtextareaTip = false;
        }

        $scope.textareaBlur = function () {     //失焦

            if ($scope.input == '') {
                $scope.isFocus = false;
                return false;
            }

            $scope.ballTree.input = $scope.input;
        }
//提交
        $scope.textareaSubmit = function () {     //提交输入的内容
            if ($scope.input.length > 0) {   //表示可提交
                $scope.ballTree.input = $scope.input;
                $scope._input = $scope.input;
                if (!$scope.ballTree.bets) {
                    $scope.ballTree.bets = [];
                }
                var inputs = $scope.ballTree.input.split(/[,|;:\t\n，：；]/g);
                var errData = [];
                var repeatData = [];
                var result = [];
                var arr = [];
                for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i].split(' ');
                    var _input = input.slice(0);
                    var flag = true;
                    for (var j = 0; j < input.length; j++) {
                        if (util.unique(input).length != $scope.ballTree.choosenum) {    //长度不足
                            errData.push(input);
                            flag = false;
                            break;
                        }

                        if (!/\d{2}/.test(input[j]) || input[j].length != 2) {   //不是两位或不是数字
                            errData.push(input);
                            flag = false;
                            break;
                        } else {
                            if (+input[j] > 11) {         //大于11的数字
                                errData.push(input);
                                flag = false;
                                break;
                            }
                        }
                    }
                    if (flag) {            //表示输入合法
                        var isReapeat = false;
                        for (var s = 0; s < arr.length; s++) {  //先对自身进行过滤
                            if (arr[s].toString() == input.sort().toString()) {
                                isReapeat = true;
                                break;
                            }
                        }

                        if (!isReapeat) {
                            for (var k = 0; k < $scope.ballTree.bets.length; k++) {   //对保存数据进行过滤
                                for (var r = 0; r < $scope.ballTree.bets[k].length; r++) {
                                    if ($scope.ballTree.bets[k][r].toString() == input.toString()) {
                                        isReapeat = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!isReapeat) {
                            arr.push(input);
                        } else {
                            repeatData.push(_input);
                        }
                    }
                }
                if (errData.length > 0 || repeatData.length > 0) {
                    $scope.hasDanshiErrror = true;
                }
                $scope.ballTree.errData = errData;
                $scope.ballTree.repeatData = repeatData;
                $scope.ballTree.bets = arr;
                $scope.count = arr.length;

                //console.log(errData,arr,repeatData,$scope.ballTree.bets);
                $scope.input = '';
                for (var v = 0; v < arr.length; v++) {
                    $scope.input += arr[v].join(' ') + '\n';
                }
                $scope.beforesubmited = true;
                angular.element('.text-areas').attr('disabled', 'disabled');


            } else {        //表示没有输入值
                new Tip('请输入后再提交').start();
            }
        }
//返回
        $scope.cancelSubmited = function () {
            $scope.input = $scope._input;
            $scope.beforesubmited = false;
            angular.element('.text-areas').removeAttr('disabled');
        }

//清空
        $scope.clearVal = function () {
            if ($scope.input == '') {
                return false;
            } else {
                $ionicPopup.confirm({
                    title: '是否清空所有注单',
                    template: '<p class="popup-param">清空注单:' + $scope.input + '</p>',
                    buttons: [
                        {text: '取消'},
                        {
                            text: '确定',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.input = '';
                            }
                        }
                    ]
                });
            }
        }

//帮助
        $scope.helprule = function () {
            $ionicPopup.alert({
                title: '温馨提示',
                template: '<p   class="helpTip">1.输入的注单请参照如下规则：单注内各号码保持相连，不同注号码间用分隔符隔开;<br>2.分隔符支持：回车[ ]空格[ ]逗号[,]分号[;]冒号[:]竖线[|];<br>3.文件较大时，提交注单可能需要一定时间，请耐心等待;</p>',
                buttons: [
                    {text: '确定', type: 'button-positive'}
                ]
            });
        }

//错误项
        $scope.showtextareaError = function () {
            //var danshiData = self.$scope.danshiData;
            var err = $scope.ballTree.errData.join(' ');
            var rp = $scope.ballTree.repeatData.join(' ');
            var tpl = "<div>错误项:<p class='fr'>" + err + "</p></div>";
            tpl += "<div>重复项:<p  class='fr' style='margin-top:-20px'>" + rp + "</p></div>";
            $ionicPopup.alert({
                title: '温馨提示',
                template: tpl,
                buttons: [
                    {
                        text: '确定',
                        type: 'button-positive',
                        onTap: function (e) {

                        }
                    }
                ]
            });
        }

//玩法说明
        $scope.showPlayInfo = function () {
            $scope.menuShow = false;
            util.getGameInfo($scope.ballTree.choosenum, $scope.currentMethod, 1763, true);
        }

//元角模式切换
        $scope.yuanjiao = function () {
            $scope.menuShow = false;
            if ($rootScope.unitPrice == 2) {
                $rootScope.unitPrice = 0.2;
                new Tip('已切换角模式').start();
            } else {
                $rootScope.unitPrice = 2;
                new Tip('已切换元模式').start();
            }
        }


//-------------------------------------事件触发区---------------------------------------------------//

        //编辑
        $rootScope.$on('edit', function ($event, _j, obj, _bets) {
            //console.log(_j,obj,_bets);
            var _obj = {};
            var str = obj.type.split('.');
            _obj.title = obj.title;
            _obj.mode = str[0];
            _obj.parent = str[1];
            _obj.name = str[2];

            //单式不能修改
            if (_obj.name == 'danshi') {
                return;
            }

            $scope.chooseGame(_j, _obj, 'evt');

            for (var i = 0; i < $scope.ballTree.length; i++) {
                var _arr = $scope.ballTree.betsArr[_j][i];
                for (var j = 0; j < _arr.length; j++) {
                    for (var k = 0; k < $scope.ballTree[i].balls.length; k++) {
                        if (_arr[j] == $scope.ballTree[i].balls[k].cnt) {
                            $scope.ballTree[i].balls[k].active = true;
                            break;
                        }
                    }
                }
            }

            $scope.modifyNum = _j;               //记录被改的下标
            $scope.multiple = obj.multiple;
            $scope.count = obj.count;
            $scope.choosenum = obj.choosenum;
            $rootScope.isEditor = true;
            location.href = '/#/pick';
        })


//------------------------------------------复式相关--------------------------------------------------------//

        //设置默认的选球界面
        $scope.ballTree = util.buildUI([phoenix.Games.N115.Config.pros.getTitleByName($scope.currentMethod)[0].substr(1)]);
        $scope.ballTree.choosenum = util.getChooseNumber($scope.currentMethod);
        $rootScope.basket[$scope.currentMethod] = $scope.ballTree;


        //返回
        $scope.goBack = function (evt) {
            if($scope.globalCount > 0){
                $ionicPopup.confirm({
                    title: '确认返回',
                    template: '<p class="popup-param">返回上层将清空已选号码,您确定要返回吗</p>',
                    buttons: [
                        {text: '取消'},
                        {
                            text: '确定',
                            type: 'button-positive',
                            onTap: function (e) {
                                history.go(-1);
                            }
                        }
                    ]
                });
            }else{
                history.go(-1);
            }
        }

        //玩法栏显示与隐藏
        $scope.changeMethod = function (evt) {
            if ($rootScope.isEditor) {
                return;
            }
            $scope.menuShow = false;
            $scope.poptypeshow = !$scope.poptypeshow;
        }
        //右侧小导航显示与隐藏
        $scope.menuShowHander = function (evt) {
            $scope.menuShow = !$scope.menuShow;
        }
        //显示最近10条开奖记录
        $scope.showRecord10 = function ($event) {
            $event.stopPropagation();
            $scope.historyShow = !$scope.historyShow;
        }
        $scope.closeRecord10 = function () {
            $scope.menuShow = false;
            $scope.historyShow = false;
        }
        //机选
        $scope.getRandom = function (evt) {
            util.clearBalls($scope.ballTree);
            typeSplits = $scope.currentMethod.split('.');
            var arr;
            if (/fushi$/.test(typeSplits[typeSplits.length - 1])) {
                //选二 - 前二直选  两组
                if (typeSplits[0] == 'xuaner' && typeSplits[1] == 'qianerzhixuan') {
                    arr = [[], []];
                    var rand1 = util.getRandom();
                    ;
                    arr[0].push(rand1);
                    var rand2 = util.getRandom();
                    while (rand1 == rand2) {
                        rand2 = util.getRandom();
                    }
                    arr[1].push(rand2);
                    //选一定位胆任选一个
                } else if (typeSplits[1] == 'dingweidan') {
                    arr = [[], [], []];
                    var rand = util.getRandom();
                    arr[Math.floor(Math.random() * 4)].push(rand);
                    //选三 - 前三直选 三组
                } else if (typeSplits[0] == 'xuansan' && typeSplits[1] == 'qiansanzhixuan') {
                    arr = [[], [], []];
                    var rand1 = util.getRandom();
                    ;
                    arr[0].push(rand1);
                    var rand2 = util.getRandom();
                    while (rand1 == rand2) {
                        rand2 = util.getRandom();
                    }
                    arr[1].push(rand2);
                    var rand3 = util.getRandom();
                    while (rand3 == rand1 || rand3 == rand2) {
                        rand3 = util.getRandom();
                    }
                    arr[2].push(rand3);
                } else {            //分配相应个数的随机数
                    arr = [];
                    arr = util.getRandArr($scope.ballTree.choosenum);
                }
            } else if (/danshi$/.test(typeSplits[typeSplits.length - 1])) {  //应该不会用到

            } else if (/dantuo$/.test(typeSplits[typeSplits.length - 1])) {  //两组
                arr = [[], []];
                var temp = util.getRandArr($scope.ballTree.choosenum);
                arr[0] = temp.splice(0, 1);
                arr[1] = temp;
            } else if (typeSplits[typeSplits.length - 1] == 'dingdanshuang') {
                arr = [];
                arr.push(Math.floor(Math.random() * 6));
                switch (arr[0]) {
                    case 0 :
                        arr[0] = '5单0双';
                        break;
                    case 1 :
                        arr[0] = '4单1双';
                        break;
                    case 2 :
                        arr[0] = '3单2双';
                        break;
                    case 3 :
                        arr[0] = '2单3双';
                        break;
                    case 4 :
                        arr[0] = '1单4双';
                        break;
                    case 5 :
                        arr[0] = '0单5双';
                        break;
                }
            } else if (typeSplits[typeSplits.length - 1] == 'caizhongwei') {
                arr = [];
                arr.push(Math.floor(Math.random() * 7) + 3);
            }
            //渲染球
            for (var i = 0; i < $scope.ballTree.length; i++) {
                for (var j = 0; j < $scope.ballTree[i].balls.length; j++) {
                    var len = $scope.ballTree[0].h3 == '胆码' ? arr[1].length : arr.length;  //定位胆看第二个数组的长度
                    for (var k = 0; k < len; k++) {
                        if ($scope.ballTree[i].balls[j].cnt == (typeof arr[i] == 'object' ? arr[i][k] : arr[k])) {
                            $scope.ballTree[i].balls[j].active = true;
                        }
                    }
                }
            }

            $rootScope.basket[$scope.currentMethod] = $scope.ballTree;
            $scope.count = util.setBets($scope.currentMethod, $scope.ballTree) || 0;
            $scope.ballTree.choosenum = util.getChooseNumber($scope.currentMethod);
            $scope.hasBall = util.hasBall($scope.ballTree);
        }

//设置注单信息
        $scope.setBukets = function () {
            $scope.menuShow = false;

            if ($scope.count > 0) {        //说明有合法注单
                if (!$scope.ballTree.betsArr) {
                    $scope.ballTree.betsArr = [];
                } else {
                    if (util.isExsits($scope.ballTree.bets, $scope.ballTree.betsArr)) {
                        new Tip('该注单已经存在！').start();
                        return;
                    }
                }

                $scope.ballTree.bets.multiple = $scope.multiple;
                $scope.ballTree.bets.count = $scope.count;
                //$scope.ballTree.betsArr.push($scope.ballTree.bets);
                $scope.ballTree.betsArr.unshift($scope.ballTree.bets);

                util.clearBalls($scope.ballTree);
                $scope.count = util.setBets($scope.currentMethod, $scope.ballTree) || 0;
                $scope.hasBall = util.hasBall($scope.ballTree);

                $rootScope.basket[$scope.currentMethod].title = $scope.currentMethodTitle;
                $rootScope.globalCount = util.getGlobalCount($rootScope.basket);
                $scope.multiple = 1;
            } else {          //非法注单
                if ($scope.hasBall) {         //选中了部分球
                    util.getGameInfo($scope.ballTree.choosenum, $scope.currentMethod);
                } else {                    //没有选择任何球
                    $scope.getRandom();
                }
            }
        }
//修改倍数
        $scope.clickMutit = function ($event) {
            $scope.extraisShow = false;
        }

//修改倍数
        $scope.customMutiple = function (value, $event) {
            $scope.multiple += value;
            if ($scope.multiple <= 0) {
                $scope.multiple = 1;
            }
            $scope.extraisShow = true;
        }

//去号码篮
        $scope.goBucket = function (flag) {
            if (!flag) {
                if ($rootScope.globalCount > 0) {      //全局注单不为空
                    if ($scope.count != 0) {                //该玩法下有注单存在
                        $scope.setBukets();
                    }
                    location.href = '/#/draw';
                } else {                             //全局注单为空
                    $scope.setBukets(false);
                    return;
                    location.href = '/#/draw';
                }
                $scope.multiple = 1;
            } else {

                if ($scope.count == 0) {
                    new Tip('请输入合法注单').start();
                    return;
                }
                var arr = [];
                console.log($scope.ballTree);

                for (var i = 0; i < $scope.ballTree.length; i++) {
                    var _arr = [];
                    for (var j = 0; j < $scope.ballTree[i].balls.length; j++) {
                        if ($scope.ballTree[i].balls[j].active == true) {
                            _arr.push($scope.ballTree[i].balls[j].cnt);
                        }
                    }
                    arr.push(_arr);
                }
                arr.count = $scope.count;
                arr.multiple = $scope.multiple;
                //arr.choosenum = $scope.choosenum;

                for (var i = 0; i < $scope.ballTree.betsArr.length; i++) {
                    if (i == $scope.modifyNum) {
                        $scope.ballTree.betsArr[i] = arr;
                        break;
                    }
                }

                $rootScope.$emit('update');
                util.clearBalls($scope.ballTree);
                $scope.count = 0;
                $scope.multiple = 1;
                $scope.hasBall = false;
                location.href = '/#/draw';
            }

        }

//随机一注
        $rootScope.$on('random', function ($event, data) {
            if (/danshi$/.test($scope.currentMethod)) {
                var arr = util.getDanshiRandom($rootScope.basket[$scope.currentMethod].choosenum);
                for (var i = 0; i < $rootScope.basket[$scope.currentMethod].betsArr.length; i++) {
                    for (var j = 0; j < $rootScope.basket[$scope.currentMethod].betsArr[i].length; j++) {
                        if (arr.toString() == $rootScope.basket[$scope.currentMethod].betsArr[i][j].toString()) {
                            arr = util.getDanshiRandom($rootScope.basket[$scope.currentMethod].choosenum);
                            j = -1;
                            i = 0;
                        }
                    }
                }
                var _arr = [arr];
                _arr.count = 1;
                //_arr.multiple = $scope.multiple;
                _arr.multiple = $rootScope.globalMultiple;
                console.log(_arr.multiple);
                $rootScope.basket[$scope.currentMethod].betsArr.push(_arr);
                $rootScope.basket[$scope.currentMethod].betsArr.unshift(_arr);
            } else {

                $scope.setBukets();   //选球
                $scope.setBukets();   //放球
            }
            $rootScope.$emit('update');
        });


        //游戏类型切换
        $scope.slideChange = function (i, gameMethods) {
            $scope.choosedType = i;
            $ionicSlideBoxDelegate.slide(i);
        }

        //【--具体游戏切换-- 渲染界面】
        $scope.chooseGame = function (j, _gameType, evt) {
            // if($scope.isEditor){
            //   return;
            // }
            if (typeof j == 'undefined') {
                $scope.poptypeshow = false;
                $scope.menuShow = false;
                return;
            }
            $scope.singleMode = false;
            $scope.ballTree = [];
            danma = [];
            $scope.beforesubmited = true;     //单式的提交按钮
            $scope.input = '';
            //$scope.hasBall = false;

            //大小单双全清的样式切换
            angular.element('.typeSpans').removeClass('active');
            angular.element(evt.target).addClass('active');


            //更改标题并收起玩法选择栏
            $scope.currentMethod = _gameType.mode + '.' + _gameType.parent + '.' + _gameType.name;
            $scope.currentMethodTitle = phoenix.Games.N115.Config.pros.getTitleByName($scope.currentMethod).join('');
            $scope.poptypeshow = false;

            //如果以前选择过就从以前的篮子里拿
            if ($rootScope.basket[$scope.currentMethod]) {
                if (/danshi$/.test(_gameType.name)) {
                    $scope.singleMode = true;
                    $scope.beforesubmited = false;
                    $scope.ShowtextareaTip = false;
                    angular.element('.text-areas').removeAttr('disabled');
                    $scope.input = $rootScope.basket[$scope.currentMethod].input;
                }
                $scope.ballTree = $rootScope.basket[$scope.currentMethod];
                //console.log($scope.ballTree);
                $scope.count = util.setBets($scope.currentMethod, $scope.ballTree) || 0;
                $scope.hasBall = util.hasBall($rootScope.basket[$scope.currentMethod]);
                return;
            }

            //复式
            if (/fushi$/.test(_gameType.name)) {
                //该模式下有三组球
                if (_gameType.parent == 'dingweidan' || _gameType.parent == 'qiansanzhixuan') {
                    $scope.ballTree = util.buildUI(['第一位', '第二位', '第三位']);
                    //该模式下有两组球
                } else if (_gameType.parent == 'qianerzhixuan') {
                    $scope.ballTree = util.buildUI(['第一位', '第二位']);
                    //该模式只有一组球
                } else {
                    var title = phoenix.Games.N115.Config.pros.getTitleByName($scope.currentMethod)[0];
                    if (title.length > 5) {
                        title = title.substr(title.length - 5);
                    } else if (title.length == 5) {
                        title = title.substr(title.length - 4);
                    }
                    $scope.ballTree = util.buildUI([title]);
                }
            } else if (/danshi$/.test(_gameType.name)) {             //单式
                $scope.singleMode = true;
                $scope.beforesubmited = false;
                $scope.ShowtextareaTip = true;
                angular.element('.text-areas').removeAttr('disabled');
                $rootScope.basket[$scope.currentMethod] = $scope.ballTree;


                //该模式下有两组球
            } else if (/dantuo$/.test(_gameType.name)) {             //胆拖
                $scope.ballTree = util.buildUI(['胆码', '拖码']);
                $scope.ballTree[0].quick = [];
                //该模式下一组球
            } else if (_gameType.name == 'dingdanshuang') {          //定单双
                $scope.ballTree = util.buildUI(['定单双'], 'dingdanshuang');
                //该模式下一组球
            } else if (_gameType.name == 'caizhongwei') {            //猜中位
                $scope.ballTree = util.buildUI(['猜中位'], 'caizhongwei');
            }
            $scope.ballTree.choosenum = util.getChooseNumber($scope.currentMethod);
            $scope.hasBall = util.hasBall($scope.ballTree);
            $scope.count = util.setBets($scope.currentMethod, $scope.ballTree) || 0;
        }

        //滑动
        $scope.slideHasChanged = function ($index) {
            $scope.choosedType = $index;
        }

        //点球
        var danma = [];
        $scope.chooseBall = function (ballTree, ball, bt) {
            $scope.menuShow = false;
            ball.active = !ball.active;
            //胆拖
            if (bt.h3 == '胆码') {
                for (var i = 0; i < danma.length; i++) {    //是不是已经被选中的球,如果是就从数据中删除
                    if (danma[i] == ball) {
                        danma.splice(i, 1);
                        return;
                    }
                }
                if (danma.length == +ballTree.choosenum - 1) {     //胆码的个数
                    danma[danma.length - 1].active = false;
                    danma.pop();
                }
                danma.push(ball);
                for (var i = 0; i < ballTree[0].balls.length; i++) {     //胆码和脱码相同
                    if (ballTree[1].balls[i].active == true && ballTree[1].balls[i].cnt == ball.cnt) {
                        ballTree[1].balls[i].active = false;
                    }
                }
            } else if (bt.h3 == '拖码') {
                for (var i = 0; i < ballTree[1].balls.length; i++) {
                    if (ballTree[0].balls[i].active == true && ballTree[0].balls[i].cnt == ball.cnt) { //胆码和脱码相同
                        ballTree[0].balls[i].active = false;
                        for (var j = 0; j < danma.length; j++) {
                            if (danma[j] == ballTree[0].balls[i]) {
                                danma.splice(j, 1);
                            }
                        }
                    }
                }
            }

            $scope.count = util.setBets($scope.currentMethod, $scope.ballTree) || 0;
            $rootScope.basket[$scope.currentMethod] = $scope.ballTree;
            $scope.hasBall = util.hasBall($rootScope.basket[$scope.currentMethod]);
        }


        //大小单双全清
        $scope.quick = function (bt, q) {
            //样式切换
            for (var i = 0; i < bt.quick.length; i++) {
                bt.quick[i].active = false;
            }
            //清空选择
            for (var i = 0; i < bt.balls.length; i++) {
                bt.balls[i].active = false;
            }

            //模式选择
            for (var i = 0; i < bt.balls.length; i++) {
                if (q.cnt == '双') {
                    if ((i + 1) % 2 == 0) {
                        bt.balls[i].active = true;
                    }
                } else if (q.cnt == '单') {
                    if (i % 2 == 0) {
                        bt.balls[i].active = true;
                    }
                } else if (q.cnt == '全') {
                    bt.balls[i].active = true;
                } else if (q.cnt == '大') {
                    if (bt.h3 == '猜中位') {
                        if (i > 2) {
                            bt.balls[i].active = true;
                        }
                    } else {
                        if (i > 4) {
                            bt.balls[i].active = true;
                        }
                    }
                } else if (q.cnt == '小') {
                    if (bt.h3 == '猜中位') {
                        if (i < 3) {
                            bt.balls[i].active = true;
                        }
                    } else {
                        if (i < 5) {
                            bt.balls[i].active = true;
                        }
                    }
                } else if (q.cnt == '清') {
                    bt.balls[i].active = false;
                }
            }
            q.active = true;
            $scope.count = util.setBets($scope.currentMethod, $scope.ballTree) || 0;
            $rootScope.basket[$scope.currentMethod] = $scope.ballTree;
            $scope.hasBall = util.hasBall($rootScope.basket[$scope.currentMethod]);
        }

    }])
    .controller('drawCtrl', ['$rootScope', '$scope', '$ionicPopup','$resource', 'util', 'Tip', function ($rootScope, $scope, $ionicPopup, $resource, util, Tip) {
        //console.log($rootScope.basket);
        $rootScope.globalMultiple = 1;
        $rootScope.continuesBet = 1;
        $scope.balance = configData.balance;
        $scope._bets = util.formatBets($rootScope.basket);            //格式化所有注单信息;
        $rootScope.betsCounts = util.getTotalInfo($rootScope.basket); //获取所有的注单及倍数信息
        $rootScope.betsMoney = util.getTotalMoney($rootScope.basket,$rootScope.unitPrice,$rootScope.continuesBet,$rootScope.globalMultiple);
        //console.log($scope._bets);
        //console.log($rootScope.basket);

        $scope.a = 1;
        $scope.goBack = function () {
            $rootScope.isEditor = false;
            location.href = '/#/pick';
        }

        //机选一注
        $scope.getrandomBalls = function () {
            $rootScope.$emit('random');
        }


        $rootScope.$on('update', function () {
            $scope._bets = util.formatBets($rootScope.basket);
            $rootScope.betsCounts = util.getTotalInfo($rootScope.basket);
            $rootScope.betsMoney = util.getTotalMoney($rootScope.basket,$rootScope.unitPrice,$rootScope.continuesBet,$rootScope.globalMultiple);
        });

//删除项
        $scope.removeBucketItem = function (_i, _bets,$event) {
            $event.stopPropagation();
            for (var i = 0; i < $rootScope.basket[_bets[i].type].betsArr.length; i++) {
                if(i == _i){
                    $rootScope.basket[_bets[i].type].betsArr.splice(i, 1);
                    $rootScope.$emit('update');
                    break;
                }
            }
        }

//清空
        $scope.showConfirm = function () {
            $rootScope.globalCount = 0;
            $ionicPopup.confirm({
                title: '是否清空所有注单',
                template: '<p class="popup-param">确定要清空吗</p>',
                buttons: [
                    {text: '取消'},
                    {
                        text: '确定',
                        type: 'button-positive',
                        onTap: function (e) {
                            for (var pro in $rootScope.basket) {
                                $rootScope.basket[pro]['betsArr'] = [];
                                $rootScope.$emit('update');
                            }
                        }
                    }
                ]
            });
        }
//编辑
        $scope.editLottory = function (i, obj, _bets) {
            $rootScope.$emit('edit', i, obj, _bets);
        }

//期数增加
        $scope.plusContinuesBet = function (flag) {
            if (!flag) {
                $rootScope.continuesBet++;
            }
            if ($rootScope.continuesBet > 234) {
                $rootScope.continuesBet = 234;
            } else if ($rootScope.continuesBet < 1) {
                $rootScope.continuesBet = 1;
            }
            $rootScope.$emit('update');
        }

//期数减少
        $scope.minusContinuesBet = function () {
            $rootScope.continuesBet--;
            if ($rootScope.continuesBet < 1) {
                $rootScope.continuesBet = 1;
            }
            $rootScope.$emit('update');
        }


//倍数增加
        $scope.globleMultipleChange = function (flag) {
            //console.log($rootScope.basket);
            if (!flag) {
                $rootScope.globalMultiple++;
            }
            $scope.checkMultiple();
            $rootScope.$emit('update');
        }

//倍数减少
        $scope.minderMutl = function () {
            $rootScope.globalMultiple--;
            if ($rootScope.globalMultiple < 1) {
                $rootScope.globalMultiple = 1;
            }
            $rootScope.$emit('update');
        }


//工具方法

        $scope.checkMultiple = function () {
            var obj = {};
            for (var pro in $rootScope.basket) {
                if (/^xuanba/.test(pro)) {      //选八
                    $scope.isMaxMultiple(pro, obj, 'xuanba', 400000 / 14.8);
                } else if (/^xuanqi/.test(pro)) {
                    $scope.isMaxMultiple(pro, obj, 'xuanqi', 400000 / 39.6);
                } else if (/^xuanliu/.test(pro)) {
                    $scope.isMaxMultiple(pro, obj, 'xuanliu', 400000 / 138);
                } else if (/^xuanwu/.test(pro)) {
                    $scope.isMaxMultiple(pro, obj, 'xuanwu', 400000 / 831);
                } else if (/^xuansi/.test(pro)) {
                    $scope.isMaxMultiple(pro, obj, 'xuansi', 400000 / 118);
                } else if (/^xuansan/.test(pro)) {
                    var _pro = pro.split('.');
                    if (_pro[1] == 'renxuansanzhongsan') {
                        $scope.isMaxMultiple(pro, obj, 'xuansan_renxuansanzhongsan', 400000 / 29.7);
                    } else if (_pro[1] == 'qianshanzuxuan') {
                        $scope.isMaxMultiple(pro, obj, 'xuansan_qianshanzuxuan', 400000 / 297);
                    } else if (_pro[1] == 'qiansanzhixuan') {
                        $scope.isMaxMultiple(pro, obj, 'xuansan_qiansanzhixuan', 400000 / 1782);
                    }
                } else if (/^xuaner/.test(pro)) {
                    var _pro = pro.split('.');
                    if (_pro[1] == 'renxuanerzhonger') {
                        $scope.isMaxMultiple(pro, obj, 'xuaner_renxuanerzhonger', 400000 / 9.9);
                    } else if (_pro[1] == 'qianerzuxuan') {
                        $scope.isMaxMultiple(pro, obj, 'xuaner_qianerzuxuan', 400000 / 99);
                    } else if (_pro[1] == 'qianerzhixuan') {
                        $scope.isMaxMultiple(pro, obj, 'xuaner_qianerzhixuan', 400000 / 198);
                    }
                } else if (/^xuanyi/.test(pro)) {
                    var _pro = pro.split('.');
                    if (_pro[1] == 'renxuanyizhongyi') {
                        $scope.isMaxMultiple(pro, obj, 'xuanyi_renxuanyizhongyi', 400000 / 3.9);
                    } else if (_pro[1] == 'dingweidan') {
                        $scope.isMaxMultiple(pro, obj, 'xuanyi_dingweidan', 400000 / 19.8);
                    } else if (_pro[1] == 'qiansanyimabudingwei') {
                        $scope.isMaxMultiple(pro, obj, 'xuanyi_qiansanyimabudingwei', 400000 / 6.6);
                    }
                } else if (/^quwei/.test(pro)) {
                    var _pro = pro.split('.');
                    if (_pro[2] == 'caizhongwei') {
                        //var limit = Math.floor(400000 / 3.9);

                    } else if (_pro[1] == 'dingdanshuang') {
                        //var limit = Math.floor(400000 / 19.8);
                    }
                }
            }
        }

        $scope.isMaxMultiple = function (pro, obj, type, max) {
            var limit = Math.floor(max);
            obj[type] = obj[type] ? obj[type] : 0;
            obj[type] += $rootScope.basket[pro].totalMultiple * $rootScope.globalMultiple;
            console.log(obj[type]);
            if (obj[type] > limit) {
                new Tip('倍投超限').start();
                $rootScope.globalMultiple--;
                return;
            }
        }

//自选号码
        $scope.goPick = function(){
            $scope.goBack();
        }

//中奖后停止追号
        $scope.traceWinStop = false;

//提交
        $scope.gosubmit = function(){
            if($rootScope.betsCounts < 0 ){
               new Tip("请先添加注单").start();
                return;
            }else if($rootScope.betsMoney > $scope.balance){
                new Tip("余额不足").start();
                return;
            }else{
                var _date = new Date();
                var _h =  _date.getFullYear();
                var _m = _date.getMonth()+1;
                _m = _m < 10 ? ('0'+_m) : _m;
                var _d = _date.getDate();
                _d = _d < 10 ? ('0'+_d) : _d;
                var _t = $rootScope.term;
                _t = _t < 10 ? ('00'+_t) : (_t<100 ? ('0'+_t):_t);
                var fin = _h+_m+_d+'-'+_t;
                var obj = {
                    name:configData.gameTypeCn, //彩票名称
                    term: fin,       //期数
                    bets:$scope._bets,          //注单信息
                    globalMultiple: $rootScope.globalMultiple,  //全局倍数
                    continuesBet :  $rootScope.continuesBet,     //全局期数
                    traceWinStop : $scope.traceWinStop,     //中奖后是否停止追号
                    award:$rootScope.award,                 //奖金组
                    money: $rootScope.betsMoney            //金额
                };
                $rootScope.info = obj;

                $ionicPopup.confirm({
                    title: '确认投注',
                    template: '<p class="popup-param">确定投注吗</p>',
                    buttons: [
                        {text: '取消'},
                        {
                            text: '确定',
                            type: 'button-positive',
                            onTap: function (e) {
                                $resource(submitUrl).get({
                                    "obj":obj
                                }, function (obj) {
                                    if(obj.isSuccess == "1"){
                                        location.href="/#/submit";
                                    }else{
                                        new Tip('投注失败').start();
                                        return;
                                    }
                                });

                            }
                        }
                    ]
                });
            }
        }

    }])
    .controller('submitCtrl', ['$rootScope','$scope', function ($rootScope,$scope) {
        console.log( $rootScope.info);
        $scope._bets = $rootScope.info.bets;
        $scope.goBack = function(){
            location.href="/#/draw";
        }

    }])
    .controller('introCtrl',['$scope',function($scope){
        $scope.goBack = function(){
            history.go(-1);
        }
    }])
    .controller('bodyCtrl', ['$scope', function ($scope) {


    }]).factory('util', ['$ionicPopup','Tip',function ($ionicPopup, Tip) {
    return {
        buildUI: function (titleArr, type) {
            var eles = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '5单0双', '4单1双', '3单2双', '2单3双', '1单4双', '0单5双', '大', '小', '全', '单', '双', '清'];
            var result = [];

            for (var i = 0; i < titleArr.length; i++) {
                var obj = {};
                obj.h3 = titleArr[i];
                obj.quick = [];
                //大小单双全清
                var quickArr = eles.slice(17);
                for (var j = 0; j < quickArr.length; j++) {
                    var o = {};
                    o.active = false;
                    o.cnt = quickArr[j];
                    obj.quick.push(o);
                }
                //球的列表
                obj.balls = [];
                var ballArr = [];
                if (!type) {
                    ballArr = eles.slice(0, 11);
                } else if (type == 'dingdanshuang') {
                    ballArr = eles.slice(11, 17);
                    obj.quick = [];
                } else if (type == 'caizhongwei') {
                    ballArr = eles.slice(2, 9);
                }

                for (var k = 0; k < ballArr.length; k++) {
                    var b = {};
                    b.active = false;
                    b.cnt = ballArr[k];
                    obj.balls.push(b);
                }
                result.push(obj);
            }
            return result;
        },
        getChooseNumber: function (name) {
            var name = name.split('.')[0];
            var num = 0;
            switch (name) {
                case 'xuanyi':
                    num = 1;
                    break;
                case 'xuaner':
                    num = 2;
                    break;
                case 'xuansan':
                    num = 3;
                    break;
                case 'xuansi':
                    num = 4;
                    break;
                case 'xuanwu':
                    num = 5;
                    break;
                case 'xuanliu':
                    num = 6;
                    break;
                case 'xuanqi':
                    num = 7;
                    break;
                case 'xuanba':
                    num = 8;
                    break;
            }
            return num;
        },
        setBets: function (type, tree) {
            //console.log(tree);
            var typeSplits = type.split('.');

            tree.bets = this.getBallLen(tree);      //放入到注单中


            //复式
            if (/fushi$/.test(typeSplits[typeSplits.length - 1])) {
                //选二 - 前二直选
                if (typeSplits[0] == 'xuaner' && typeSplits[1] == 'qianerzhixuan') {
                    var counts = 0;
                    for (var i = 0; i < tree.bets.length; i++) {
                        if (tree.bets[i].length > 0) {
                            if (tree.bets[i + 1] && tree.bets[i + 1].length > 0) {
                                if (tree.bets[i].length == 1 && tree.bets[i + 1].length == 1) {
                                    if (tree.bets[i][0] != tree.bets[i + 1][0]) {
                                        return counts = 1;
                                    }
                                } else {
                                    for (var i = 0; i < tree.bets[0].length; i++) {
                                        for (var j = 0; j < tree.bets[1].length; j++) {
                                            var temp = [];
                                            temp.push(tree.bets[0][i]);
                                            temp.push(tree.bets[1][j]);
                                            if (temp[0] != temp[1]) {
                                                counts++;
                                            }
                                        }
                                    }
                                    return counts;
                                }
                            }
                        }
                    }
                    return counts;
                    //选三 - 前三直选
                } else if (typeSplits[0] == 'xuansan' && typeSplits[1] == 'qiansanzhixuan') {
                    var counts = 0;
                    var arr = [];
                    for (var i = 0; i < tree.bets[0].length; i++) {
                        for (var j = 0; j < tree.bets[1].length; j++) {
                            if (tree.bets[0][i] == tree.bets[1][j]) {
                                continue;
                            }
                            for (var k = 0; k < tree.bets[2].length; k++) {
                                if (tree.bets[1][j] == tree.bets[2][k] || tree.bets[0][i] == tree.bets[2][k]) {
                                    continue;
                                }
                                counts++;
                                var str = tree.bets[0][i] + ',' + tree.bets[1][j] + ',' + tree.bets[2][k];
                                arr.push(str);
                            }
                        }
                    }
                    return counts;
                } else {
                    return this.getCounts(tree, tree.choosenum);
                }

            } else if (/danshi$/.test(typeSplits[typeSplits.length - 1])) {  //应该不会用到

            } else if (/dantuo$/.test(typeSplits[typeSplits.length - 1])) {
                var arr = [], arr1 = [];
                for (var i = 0; i < tree[0].balls.length; i++) {
                    if (tree[0].balls[i].active == true) {
                        arr.push(tree[0].balls[i].cnt);
                    }
                    if (tree[1].balls[i].active == true) {
                        arr1.push(tree[1].balls[i].cnt);
                    }
                }
                if (arr.length + arr1.length >= tree.choosenum) {
                    return this.getCombine(arr1.length, tree.choosenum - arr.length);
                }

            } else if (typeSplits[typeSplits.length - 1] == 'dingdanshuang') {
                return this.getCounts(tree, tree.choosenum);
            } else if (typeSplits[typeSplits.length - 1] == 'caizhongwei') {
                return this.getCounts(tree, tree.choosenum);
            }
        },
        getBallLen: function (tree) {     //选了哪些球 [[],[],[]];
            var choosedBall = [];
            for (var i = 0; i < tree.length; i++) {
                var temp = [];
                for (var j = 0; j < tree[i].balls.length; j++) {
                    if (tree[i].balls[j].active == true) {
                        temp.push(tree[i].balls[j].cnt);
                    }
                }
                choosedBall.push(temp);
            }
            return choosedBall;
        },
        getCombine: function (n, m) {             //获取排列组合
            var rs = 1;
            for (var i = n; i > n - m; i--) {
                rs *= i;
            }
            return rs / this.factorial(m);
        },
        factorial: function (m) {                //阶层公式
            return ( m <= 1 ) ? 1 : m * this.factorial(m - 1);
        },
        getCounts: function (tree, len) {         //获取注数
            var counts = 0;
            for (var i = 0; i < tree.bets.length; i++) {
                if (tree.bets[i].length >= len) {
                    if (len > 1) {
                        counts = this.getCombine(tree.bets[i].length, len);
                    } else {
                        counts += tree.bets[i].length;
                    }
                }
            }
            return counts;
        },
        hasBall: function (tree) {
            for (var i = 0; i < tree.length; i++) {
                for (var j = 0; j < tree[i].balls.length; j++) {
                    if (tree[i].balls[j].active == true) {
                        return true;
                    }
                }
            }
            return false;
        },
        getRandom: function () {
            return Math.floor(Math.random() * 11) + 1;
        },
        getRandArr: function (tree) {
            var arr = [];
            for (var i = 0; i < tree; i++) {
                var rand = this.getRandom();
                for (var j = 0; j < arr.length; j++) {
                    if (rand == arr[j]) {
                        rand = this.getRandom();
                        j = -1;
                    }
                }
                arr.push(rand);
            }
            return arr;
        },
        clearBalls: function (tree) {          //清除球
            for (var i = 0; i < tree.length; i++) {
                for (var j = 0; j < tree[i].balls.length; j++) {
                    tree[i].balls[j].active = false;
                }
            }
        },
        isExsits: function (tree, trees) {    //注单是否存在
            for (var i = 0; i < trees.length; i++) {
                if (tree.toString() == trees[i].toString()) {   //[[],[],[]]
                    var flag = true;
                    for (var j = 0; j < trees[i].length; j++) {
                        if (tree[j].toString() != trees[i][j].toString()) {
                            flag = false;
                            break;
                        }
                    }
                    if (!flag) {
                        continue;
                    }
                    return true;
                }
            }
            return false;
        },
        getGlobalCount: function (trees) {   //获取中的注数
            var counts = 0;
            for (var p in trees) {
                if (trees[p]['betsArr']) {
                    counts += trees[p]['betsArr'].length;
                }
            }
            return counts;
        },
        formatBets: function (tree) {
            //console.log(tree);
            var bets = [];
            for (var pro in tree) {
                if (!tree[pro]['betsArr']) {
                    continue;
                }

                for (var i = 0; i < tree[pro]['betsArr'].length; i++) {
                    //一个注单
                    var obj = {type: pro};
                    obj.title = tree[pro]['title'];
                    obj.choosenum = tree[pro]['choosenum'];
                    obj.bet = '';
                    if (/danshi$/.test(pro)) {          //单式
                        for (var _i = 0; _i < tree[pro]['betsArr'][i].length; _i++) {
                            var str = '';
                            str = tree[pro]['betsArr'][i][_i].join(' ');
                            if (_i != tree[pro]['betsArr'][i].length - 1) {
                                str += ',';
                            }
                            obj.bet += str;
                        }
                        obj.danshi = true;
                    } else {            //除了单式
                        for (var j = 0; j < tree[pro]['betsArr'][i].length; j++) {
                            //console.log(tree[pro]['betsArr'][i][j]);
                            if (tree[pro]['betsArr'][i].length == 1) {
                                obj.bet += tree[pro]['betsArr'][i][j].join(',');
                            } else if (tree[pro]['betsArr'][i].length == 2) {
                                //console.log(tree[pro]['betsArr'][i][j].join(' '));
                                if (/dantuo$/.test(obj.type)) {
                                    if (j == 0) {
                                        obj.bet += '[胆' + tree[pro]['betsArr'][i][j].join(',') + '] ';
                                    } else {
                                        obj.bet += tree[pro]['betsArr'][i][j].join(',');
                                    }
                                } else {
                                    var str = tree[pro]['betsArr'][i][j].join(' ');
                                    obj.bet += str + ',';
                                    if (j == 1) {
                                        obj.bet += '-,-,-';
                                    }
                                }
                            } else if (tree[pro]['betsArr'][i].length == 3) {
                                var str = tree[pro]['betsArr'][i][j].join(' ');
                                if (str == '') {
                                    str = '-';
                                }
                                obj.bet += str + ',';
                                if (j == 2) {
                                    obj.bet += '-,-';
                                }
                            }
                        }
                    }
                    obj.count = tree[pro]['betsArr'][i]['count'];
                    obj.multiple = tree[pro]['betsArr'][i]['multiple'];
                    //bets.unshift(obj);
                    bets.push(obj);
                }
            }
            return bets;
        },
        unique: function (arr) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                if (result.indexOf(arr[i]) == -1) {
                    result.push(arr[i]);
                }
            }
            return result;
        },
        getGameInfo: function (num, method, award, type) {
            var num = num;
            var str = "任选" + num + "个号码为一注";
            if ((num == 2 && method.split('.')[1] == 'qianerzhixuan') || (num == 3 && method.split('.')[1] == 'qiansanzhixuan')) {
                str = "每位任选1个不同的号码为一注";
            } else if (/dantuo$/.test(method)) {
                str = "选取" + num + "个号码为一注且胆码与脱码不同";
            }
            if (!type && !award) {
                new Tip(str).start();
            } else {
                if (/danshi$/.test(method)) {

                    return;
                }
                $ionicPopup.confirm({
                    //title: '是否清空所有注单',
                    template: '<p style="color:#000;line-height:10px;">' + str + '</p><p style="color:#000;line-height:10px;">基础奖金' + award + '元</p>',
                    buttons: [
                        {
                            text: '查看玩法说明',
                            onTap: function (e) {
                                location.href = '/#/intro';
                            }
                        },
                        {
                            text: '关闭',
                            type: 'button-positive',
                            onTap: function (e) {

                            }
                        }
                    ]
                });
                angular.element('.popup-head').css('border-bottom', 'none');
            }

        },
        getTimeout: function () {
            var _h = new Date().getHours();
            var _m = new Date().getMinutes();
            var time;
            if((_h == 9&& _m >=5) ||(_h > 9 && _h <22)){   //9点到22点
                
                return time = 900 - (_m % 10 * 60  + new Date().getSeconds() + 1);
            }
            return false;
        },
        getDanshiRandom: function (num) {
            var arr = [];
            for (var i = 0; i < num * 1000; i++) {
                var rand = this.getRandom();
                if (arr.indexOf(rand) == -1) {
                    arr.push(rand);
                    if (arr.length == num) {
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j] < 10) {
                                arr[j] = '0' + arr[j];
                            } else {
                                arr[j] += '';
                            }
                        }
                        arr = arr.sort();
                        break;
                    }
                }
            }
            return arr;
        },
        getTotalInfo: function (tree) {
            var _totalCount = 0;

            for (var pro in tree) {
                var totalCount = 0;
                var totalMultiple = 0;
                if (!tree[pro]['betsArr']) {
                    tree[pro]['betsArr'] = [];
                }
                for (var i = 0; i < tree[pro]['betsArr'].length; i++) {
                    totalCount += tree[pro]['betsArr'][i].count;
                    totalMultiple += tree[pro]['betsArr'][i].multiple;
                }
                tree[pro].totalCount = totalCount;
                tree[pro].totalMultiple = totalMultiple;
                _totalCount += totalCount;
            }
            return _totalCount;
        },
        getTotalMoney: function (tree,unitPrice,isContinueBet,globalMultiple) {
            var money = 0;
            for(var prop in tree) {
                for (var i = 0; i < tree[prop]['betsArr'].length; i++) {
                    var m = 0;
                    if (isContinueBet > 1) {
                        m = tree[prop].betsArr[i].count * unitPrice * globalMultiple * isContinueBet;
                    } else {
                        m = tree[prop].betsArr[i].count * unitPrice * tree[prop].betsArr[i].multiple * globalMultiple;
                    }
                    money += m;
                }
            }
            return money;
        }
    }
}]).factory('Tip', function () {
    function tipAnimationo(word, dom) {
        this.$dom = $('body')
        this.word = word || '提示';
    }

    tipAnimationo.prototype = {
        create: function () {
            var _this = this;
            var $ele = $('<div class="tips"></div>');
            $ele.html(this.word);
            this.$dom.append($ele);
            $ele.fadeIn();
            setTimeout(function () {
                $ele.fadeOut(function () {
                    $ele.remove();
                });
            }, 2000)
        },
        start: function (method) {
            this.create();
        }
    };
    return tipAnimationo;
})



