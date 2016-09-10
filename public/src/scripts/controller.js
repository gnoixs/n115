angular.module('starter.controllers', ['ionic'])
    .controller('pickCtrl', ['$rootScope','$scope', '$ionicSlideBoxDelegate','util', function ($rootScope, $scope,$ionicSlideBoxDelegate,util) {                 //选球控制器
        
        $scope.currentMethod = configData.defaultMethod;              //当前方法 xuanwu.renxuanwuzhongwu.fushi 
        $scope.currentMethodTitle = phoenix.Games.N115.Config.pros.getTitleByName( $scope.currentMethod).join('');      //获取默认标题
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
        $scope.hasBall = false;

        $scope.extraisShow = true;      //倍数选择栏，ng-hide

        $rootScope.globalCount = 0;

        //号码篮
        $rootScope.basket = {};
        

        //设置默认的选球界面
        $scope.ballTree = util.buildUI([phoenix.Games.N115.Config.pros.getTitleByName( $scope.currentMethod)[0].substr(1)]);
        $scope.ballTree.choosenum = util.getChooseNumber($scope.currentMethod);
        $rootScope.basket[$scope.currentMethod] = $scope.ballTree;

        
        
        //返回
        $scope.goBack = function(evt){                                          
          console.log('back');
        }

       //玩法栏显示与隐藏
       $scope.changeMethod = function(evt){                                     
         $scope.poptypeshow = !$scope.poptypeshow;
       }
       //右侧小导航显示与隐藏
       $scope.menuShowHander = function(evt){                                
        $scope.menuShow = !$scope.menuShow;
      }
       //显示最近10条开奖记录
       $scope.showRecord10 = function(evt){
         $scope.historyShow = !$scope.historyShow;
       }
       //机选
       $scope.getRandom = function(evt){
        util.clearBalls($scope.ballTree);
        typeSplits =  $scope.currentMethod.split('.');
        var arr;
        if(/fushi$/.test(typeSplits[typeSplits.length-1])){
              //选二 - 前二直选  两组
              if(typeSplits[0] == 'xuaner' && typeSplits[1] == 'qianerzhixuan'){
                arr = [[],[]];
                var rand1 = util.getRandom();;
                arr[0].push(rand1);
                var rand2 = util.getRandom();
                while(rand1 == rand2){
                  rand2 = util.getRandom();
                }
                arr[1].push(rand2);
                //选一定位胆任选一个
              }else if(typeSplits[1] == 'dingweidan'){
                arr = [[],[],[]];
                var rand = util.getRandom();
                arr[Math.floor(Math.random()*4)].push(rand);
                 //选三 - 前三直选 三组
               }else if(typeSplits[0] == 'xuansan' && typeSplits[1] == 'qiansanzhixuan'){
                arr = [[],[],[]];
                var rand1 = util.getRandom();;
                arr[0].push(rand1);
                var rand2 = util.getRandom();
                while(rand1 == rand2){
                  rand2 = util.getRandom();
                }
                arr[1].push(rand2);
                var rand3 = util.getRandom();
                while(rand3 == rand1 || rand3 == rand2){
                  rand3 = util.getRandom();
                }
                arr[2].push(rand3);
              }else{            //分配相应个数的随机数
               arr = [];
               arr = util.getRandArr($scope.ballTree.choosenum);
             }
          }else if(/danshi$/.test(typeSplits[typeSplits.length-1])){  //应该不会用到 
            console.log('单式');
          }else if(/dantuo$/.test(typeSplits[typeSplits.length-1])){  //两组
            arr = [[],[]];
            var temp = util.getRandArr($scope.ballTree.choosenum);
            arr[0] = temp.splice(0,1);
            arr[1] = temp;
          }else if(typeSplits[typeSplits.length-1] == 'dingdanshuang'){          
            arr = [];
            arr.push(Math.floor(Math.random()*6));
            switch(arr[0]){
              case 0 : arr[0] = '5单0双';break;
              case 1 : arr[0] = '4单1双';break;
              case 2 : arr[0] = '3单2双';break;
              case 3 : arr[0] = '2单3双';break;
              case 4 : arr[0] = '1单4双';break;
              case 5 : arr[0] = '0单5双';break;
            }
          }else if(typeSplits[typeSplits.length-1] == 'caizhongwei'){         
            arr = [];
            arr.push(Math.floor(Math.random()*7)+3);
          }
          //渲染球
          for(var i = 0 ; i < $scope.ballTree.length; i++){
            for(var j = 0; j<$scope.ballTree[i].balls.length; j++){
              var len = $scope.ballTree[0].h3 == '胆码' ? arr[1].length : arr.length;  //定位胆看第二个数组的长度
              for(var k = 0; k < len; k++){
               if($scope.ballTree[i].balls[j].cnt == (typeof arr[i] == 'object' ? arr[i][k] : arr[k])){
                $scope.ballTree[i].balls[j].active = true;
              }
            }
          }
        }

        $rootScope.basket[$scope.currentMethod] = $scope.ballTree;
        $scope.count = util.setBets($scope.currentMethod,$scope.ballTree) || 0;
        $scope.ballTree.choosenum = util.getChooseNumber($scope.currentMethod);
        $scope.hasBall = util.hasBall($scope.ballTree);
      }

//设置注单信息
$scope.setBukets = function(isdanshi){
  if(isdanshi){
    return;
  }

        if($scope.count > 0 ){        //说明有合法注单
          if(!$scope.ballTree.betsArr){
            $scope.ballTree.betsArr = [];        
          }else{
           if(util.isExsits($scope.ballTree.bets,$scope.ballTree.betsArr)){
            return;
          }
        } 

        $scope.ballTree.bets.multiple = $scope.multiple;
        $scope.ballTree.bets.count = $scope.count;
        $scope.ballTree.betsArr.push($scope.ballTree.bets);

        util.clearBalls($scope.ballTree);
        $scope.count = util.setBets($scope.currentMethod,$scope.ballTree) || 0;
        $scope.hasBall = util.hasBall($scope.ballTree);

        $rootScope.basket[$scope.currentMethod].title = $scope.currentMethodTitle;        
        $rootScope.globalCount = util.getGlobalCount($rootScope.basket);

          //console.log($scope.ballTree.bets,$scope.ballTree.betsArr);

        }else{          //非法注单
          if($scope.hasBall){         //选中了部分球
            console.log('--');
          }else{                    //没有选择任何球
            $scope.getRandom();
          }
        }
      }
//修改倍数
$scope.clickMutit = function($event){
 $scope.extraisShow = false;
}

//修改倍数
$scope.customMutiple = function(value,$event){
  $scope.multiple += value;
  if($scope.multiple <= 0){
    $scope.multiple =1;
  }
  $scope.extraisShow = true;
}

//去号码篮
$scope.goBucket = function(){
 if($rootScope.globalCount > 0 ){      //说明有合法注单
  location.href='/#/draw';
 }else{
  $scope.setBukets(false);
 }
}



       //游戏类型切换
       $scope.slideChange = function(i,gameMethods){ 
        $scope.choosedType = i;
        $ionicSlideBoxDelegate.slide(i);
      }

       //【--具体游戏切换-- 渲染界面】
       $scope.chooseGame = function(j,_gameType,evt){
        $scope.singleMode = false;
        $scope.ballTree  = [];
        danma = [];
        //$scope.hasBall = false;

       //大小单双全清的样式切换
       angular.element('.typeSpans').removeClass('active');
       angular.element(evt.target).addClass('active');
       

        //更改标题并收起玩法选择栏
        $scope.currentMethod = _gameType.mode+'.'+_gameType.parent+'.'+_gameType.name;
        $scope.currentMethodTitle = phoenix.Games.N115.Config.pros.getTitleByName($scope.currentMethod).join('');
        $scope.poptypeshow = false;

        //如果以前选择过就从以前的篮子里拿
        if($rootScope.basket[$scope.currentMethod]){
          $scope.ballTree = $rootScope.basket[$scope.currentMethod];
          $scope.count = util.setBets($scope.currentMethod,$scope.ballTree) || 0;
          $scope.hasBall = util.hasBall($rootScope.basket[$scope.currentMethod]);
          return;
        }

          //复式
          if(/fushi$/.test(_gameType.name)){                    
            //该模式下有三组球
            if(_gameType.parent == 'dingweidan' || _gameType.parent == 'qiansanzhixuan' ){  
              $scope.ballTree = util.buildUI(['第一位','第二位','第三位']);
            //该模式下有两组球
          }else if(_gameType.parent == 'qianerzhixuan'){
            $scope.ballTree = util.buildUI(['第一位','第二位']);
            //该模式只有一组球  
          }else{
            var title = phoenix.Games.N115.Config.pros.getTitleByName( $scope.currentMethod)[0];
            if(title.length > 5){
              title = title.substr(title.length-5);
            }else if(title.length == 5){
              title = title.substr(title.length-4);
            }
            $scope.ballTree = util.buildUI([title]);
          }
          }else if(/danshi$/.test(_gameType.name)){             //单式
            $scope.singleMode = true;
            //该模式下有两组球
          }else if(/dantuo$/.test(_gameType.name)){             //胆拖
            $scope.ballTree = util.buildUI(['胆码','拖码']);
            $scope.ballTree[0].quick = [];
            //该模式下一组球
          }else if(_gameType.name == 'dingdanshuang'){          //定单双
            $scope.ballTree = util.buildUI(['定单双'],'dingdanshuang');
            //该模式下一组球
          }else if(_gameType.name == 'caizhongwei'){            //猜中位
            $scope.ballTree = util.buildUI(['猜中位'],'caizhongwei');
          }
          $scope.ballTree.choosenum = util.getChooseNumber($scope.currentMethod);
          $scope.hasBall = util.hasBall($scope.ballTree);
          $scope.count = util.setBets($scope.currentMethod,$scope.ballTree) || 0;
        }

        //滑动
        $scope.slideHasChanged =function($index){
         $scope.choosedType = $index;
       }

       //点球
       var danma = [];
       $scope.chooseBall = function(ballTree,ball,bt){
        ball.active = !ball.active;
        //胆拖
        if(bt.h3 == '胆码'){
          for(var  i = 0; i<danma.length; i++){    //是不是已经被选中的球,如果是就从数据中删除
            if(danma[i] == ball){
              danma.splice(i,1);
              return;
            }
          }
           if(danma.length == +ballTree.choosenum-1){     //胆码的个数
            danma[danma.length-1].active = false;
            danma.pop();
          }
          danma.push(ball);
           for(var i = 0; i < ballTree[0].balls.length; i++){     //胆码和脱码相同
            if(ballTree[1].balls[i].active == true && ballTree[1].balls[i].cnt == ball.cnt){
              ballTree[1].balls[i].active = false;
            }
          }
        }else if(bt.h3 == '拖码'){
          for(var i = 0; i < ballTree[1].balls.length; i++){
            if(ballTree[0].balls[i].active == true && ballTree[0].balls[i].cnt == ball.cnt){ //胆码和脱码相同
              ballTree[0].balls[i].active = false;
              for(var j = 0; j < danma.length; j++){
                if(danma[j] == ballTree[0].balls[i]){
                  danma.splice(j,1);
                }
              }
            }
          }
        }
        
        $scope.count = util.setBets($scope.currentMethod,$scope.ballTree) || 0;
        $rootScope.basket[$scope.currentMethod] = $scope.ballTree;
        $scope.hasBall = util.hasBall($rootScope.basket[$scope.currentMethod]);
      }


       //大小单双全清
       $scope.quick = function(bt,q){
        //样式切换
        for(var i = 0; i < bt.quick.length;i++){
          bt.quick[i].active = false;
        }
        //清空选择
        for(var i = 0 ;i < bt.balls.length; i++){
          bt.balls[i].active = false;
        }

        //模式选择
        for(var i = 0; i<bt.balls.length; i++){
          if(q.cnt == '双'){
            if((i+1) % 2 == 0){
              bt.balls[i].active = true;
            }
          }else if(q.cnt == '单'){
            if(i % 2 == 0){
              bt.balls[i].active = true;
            }  
          }else if(q.cnt == '全'){
            bt.balls[i].active = true;
          }else if(q.cnt == '大'){
            if(bt.h3 == '猜中位'){
              if(i > 2){
                bt.balls[i].active = true;
              }
            }else{
              if(i > 4){
                bt.balls[i].active = true;
              }
            }
          }else if(q.cnt == '小'){
            if(bt.h3 == '猜中位'){
              if(i < 3){
                bt.balls[i].active = true;
              }
            }else{
              if(i < 5){
                bt.balls[i].active = true;
              }
            }
          }else if(q.cnt == '清'){
            bt.balls[i].active = false;
          }
        }
        q.active = true;
        $scope.count = util.setBets($scope.currentMethod,$scope.ballTree) || 0;
        $rootScope.basket[$scope.currentMethod] = $scope.ballTree;
        $scope.hasBall = util.hasBall($rootScope.basket[$scope.currentMethod]);
      }

    }])
.controller('drawCtrl', ['$rootScope','$scope','util', function ($rootScope,$scope,util) {
  //console.log($rootScope.basket);
  $scope._bets = util.formatBets($rootScope.basket);          //格式化所有注单信息; 
  $rootScope.globalMultiple = 1;
  $rootScope.continuesBet = 1;
  $scope.goBack = function(){
    location.href = '/#/pick';
  }
 

 
    

}])
.controller('submitCtrl',  ['$scope', function ($scope) {


}])
.controller('bodyCtrl', ['$scope', function ($scope) {


}]).factory('util',function(){  
  return{
    buildUI:function(titleArr,type){
     var eles = ['01','02','03','04','05','06','07','08','09','10','11','5单0双','4单1双','3单2双','2单3双','1单4双','0单5双','大','小','全','单','双','清'];
     var result = [];

     for(var i = 0 ;i<titleArr.length;i++){
      var obj = {};
      obj.h3 = titleArr[i];
      obj.quick = [];
                //大小单双全清
                var quickArr = eles.slice(17);
                for(var j = 0; j < quickArr.length; j++){
                  var o = {};
                  o.active = false;
                  o.cnt = quickArr[j];
                  obj.quick.push(o);
                }
                //球的列表
                obj.balls = [];
                var ballArr = [];
                if(!type){
                 ballArr = eles.slice(0,11);
               }else if(type == 'dingdanshuang'){
                 ballArr = eles.slice(11,17);
                 obj.quick = [];
               }else if(type == 'caizhongwei'){
                ballArr = eles.slice(2,9);
              }

              for(var k = 0; k < ballArr.length; k++){
                var b = {};
                b.active = false;
                b.cnt = ballArr[k];
                obj.balls.push(b);
              }
              result.push(obj);
            }
            return result;
          },
          getChooseNumber:function(name){
            var name = name.split('.')[0];
            var num = 0;
            switch(name){
              case 'xuanyi':num = 1;break;
              case 'xuaner':num = 2;break;
              case 'xuansan':num = 3;break;
              case 'xuansi':num = 4;break;
              case 'xuanwu':num = 5;break;
              case 'xuanliu':num = 6;break;
              case 'xuanqi':num = 7;break;
              case 'xuanba':num = 8;break;
            }
            return num;
          },
          setBets:function(type,tree){
          //console.log(tree);
          var typeSplits = type.split('.');

          tree.bets = this.getBallLen(tree);      //放入到注单中

          //复式
          if(/fushi$/.test(typeSplits[typeSplits.length-1])){
              //选二 - 前二直选
              if(typeSplits[0] == 'xuaner' && typeSplits[1] == 'qianerzhixuan'){
                var counts = 0;
                for( var i = 0; i < tree.bets.length; i++){
                  if(tree.bets[i].length > 0){
                    if(tree.bets[i+1] && tree.bets[i+1].length > 0){
                      if(tree.bets[i].length == 1 && tree.bets[i+1].length == 1){
                        if(tree.bets[i][0] != tree.bets[i+1][0]){
                          return counts = 1;
                        }
                      }else{
                        for(var i = 0; i < tree.bets[0].length; i++){
                          for(var j = 0; j < tree.bets[1].length; j++){
                            var temp = [];
                            temp.push(tree.bets[0][i]);
                            temp.push(tree.bets[1][j]);
                            if(temp[0] != temp[1]){
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
              }else if(typeSplits[0] == 'xuansan' && typeSplits[1] == 'qiansanzhixuan'){
                var counts = 0;
                var arr = [];
                for(var i = 0; i < tree.bets[0].length; i++){
                  for(var j = 0; j < tree.bets[1].length; j++){
                    if(tree.bets[0][i] == tree.bets[1][j]){
                      continue;
                    }
                    for(var k = 0; k < tree.bets[2].length; k++){
                      if(tree.bets[1][j] == tree.bets[2][k] || tree.bets[0][i] == tree.bets[2][k]){
                        continue;
                      }
                      counts++;
                      var str = tree.bets[0][i]+','+tree.bets[1][j]+','+tree.bets[2][k];
                      arr.push(str);
                    }
                  }
                }
                return counts;
              }else{
               return this.getCounts(tree,tree.choosenum);
             }

          }else if(/danshi$/.test(typeSplits[typeSplits.length-1])){  //应该不会用到 
            console.log('单式');
          }else if(/dantuo$/.test(typeSplits[typeSplits.length-1])){
            var arr = [],arr1 = [];
            for(var i = 0; i < tree[0].balls.length; i++){
              if(tree[0].balls[i].active == true){
               arr.push(tree[0].balls[i].cnt);
             }
             if(tree[1].balls[i].active == true){
              arr1.push(tree[1].balls[i].cnt);
            }              
          }
          if(arr.length + arr1.length >= tree.choosenum){
           return this.getCombine(arr1.length,tree.choosenum-arr.length);
         }

       }else if(typeSplits[typeSplits.length-1] == 'dingdanshuang'){          
        return this.getCounts(tree,tree.choosenum);
      }else if(typeSplits[typeSplits.length-1] == 'caizhongwei'){         
        return this.getCounts(tree,tree.choosenum);
      }
    },
        getBallLen:function(tree){     //选了哪些球 [[],[],[]];
          var choosedBall = [];
          for(var i =0; i < tree.length; i++){
            var temp = [];
            for(var j = 0; j < tree[i].balls.length; j++){
              if(tree[i].balls[j].active == true){
                temp.push(tree[i].balls[j].cnt);
              }
            }
            choosedBall.push(temp);
          }
          return choosedBall;
        },
        getCombine:function(n,m){             //获取排列组合
          var rs = 1; 
          for(var i = n; i>n-m; i--){
            rs *= i;
          }
          return rs / this.factorial(m);
        },
        factorial:function(m){                //阶层公式
          return ( m <= 1 ) ? 1 : m * this.factorial( m-1 );
        },
        getCounts:function(tree,len){         //获取注数
          var counts = 0;
          for( var i = 0; i < tree.bets.length; i++){
            if(tree.bets[i].length >= len){
              if(len > 1){
                counts = this.getCombine(tree.bets[i].length,len);
              }else{
                counts += tree.bets[i].length;
              }             
            }
          }
          return counts;
        },
        hasBall:function(tree){
          for(var i = 0; i < tree.length; i++){
            for(var j = 0; j < tree[i].balls.length; j++){
              if(tree[i].balls[j].active == true){
                return true;
              }
            }
          }
          return false;
        },
        getRandom:function(){
          return Math.floor(Math.random()*11)+1;
        },
        getRandArr:function(tree){
          var arr = [];
          for(var i = 0; i < tree; i++){
            var rand = this.getRandom();
            for( var j = 0; j < arr.length; j++){
              if(rand == arr[j]){
                rand = this.getRandom();
                j = -1;
              }
            }
            arr.push(rand);
          }
          return arr;
        },
        clearBalls:function(tree){          //清除球
          for(var i = 0 ; i < tree.length; i++){
            for(var j = 0; j<tree[i].balls.length; j++){
              tree[i].balls[j].active = false;
            }
          }
        },
        isExsits:function(tree,trees){    //注单是否存在
          for(var i = 0; i < trees.length; i++){
            if(tree.toString() == trees[i].toString()) {   //[[],[],[]]
              var flag = true;
              for(var j = 0; j < trees[i].length; j++) {
                if(tree[j].toString() != trees[i][j].toString()){
                  flag = false;
                  break;
                }
              }
              if(!flag){
                continue;
              }
              return true;
            }      
          }
          return false;
        },
        getGlobalCount:function(trees){   //获取中的注数
          var counts = 0;
          for(var p in trees){
            if(trees[p]['betsArr']){
              counts += trees[p]['betsArr'].length;
            }
          }
          return counts;
        },
        formatBets:function(tree){
          var bets = [];
          for(var pro in tree){
            if(!tree[pro]['betsArr']){
              continue;
            }
            for(var i = 0; i <tree[pro]['betsArr'].length; i++){
              //一个注单
              var obj = {type:pro};
              obj.title = tree[pro]['title'];
              obj.choosenum = tree[pro]['choosenum'];
              obj.bet = '';
              for(var j = 0 ; j < tree[pro]['betsArr'][i].length; j++){
                //console.log(tree[pro]['betsArr'][i][j]);
                if(tree[pro]['betsArr'][i].length == 1){
                   obj.bet  += tree[pro]['betsArr'][i][j].join(',');
                }else if(tree[pro]['betsArr'][i].length == 2){
                  //console.log(tree[pro]['betsArr'][i][j].join(' '));
                  if(/dantuo$/.test(obj.type)){
                    if(j == 0){
                      obj.bet += '[胆'+tree[pro]['betsArr'][i][j].join(',')+'] ';
                    }else{
                      obj.bet += tree[pro]['betsArr'][i][j].join(',');
                    }
                  }else{
                    var str = tree[pro]['betsArr'][i][j].join(' ');
                    obj.bet += str + ',';
                    if(j == 1){
                      obj.bet += '-,-,-';
                    }
                  }            
                }else if(tree[pro]['betsArr'][i].length == 3){
                   var str = tree[pro]['betsArr'][i][j].join(' ');
                   if(str == ''){
                    str = '-';
                   }
                   obj.bet += str + ',';
                   if(j == 2){
                    obj.bet += '-,-';
                   }
                }
              }
              obj.count = tree[pro]['betsArr'][i]['count'];
              obj.multiple = tree[pro]['betsArr'][i]['multiple'];
              bets.unshift(obj);
            }       
          }
          return bets;
        }
      }
    })



