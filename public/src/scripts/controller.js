angular.module('starter.controllers', ['ionic'])
    .controller('pickCtrl', ['$scope', '$ionicSlideBoxDelegate','util', function ( $scope,$ionicSlideBoxDelegate,util) {                 //选球控制器
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
        $scope.unitPrice = 2;           //单价
        $scope.multiple = 1;            //倍数
        

 
        //号码篮
        $scope.basket = {};
        
        //设置默认的选球界面
        $scope.ballTree = util.buildUI([phoenix.Games.N115.Config.pros.getTitleByName( $scope.currentMethod)[0].substr(1)]);
        $scope.ballTree.choosenum = util.getChooseNumber($scope.currentMethod);
        $scope.basket[$scope.currentMethod] = $scope.ballTree;
       
        
        
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
        console.log('机选');
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

       //大小单双全清的样式切换
        angular.element('.typeSpans').removeClass('active');
        angular.element(evt.target).addClass('active');
       

        //更改标题并收起玩法选择栏
        $scope.currentMethod = _gameType.mode+'.'+_gameType.parent+'.'+_gameType.name;
        $scope.currentMethodTitle = phoenix.Games.N115.Config.pros.getTitleByName($scope.currentMethod).join('');
        $scope.poptypeshow = false;

        //如果以前选择过就从以前的篮子里拿
        if($scope.basket[$scope.currentMethod]){
          $scope.ballTree = $scope.basket[$scope.currentMethod];
          //console.log($scope.ballTree);
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
              $scope.ballTree = util.buildUI([''],'dingdanshuang');
            //该模式下一组球
          }else if(_gameType.name == 'caizhongwei'){            //猜中位
              $scope.ballTree = util.buildUI(['猜中位'],'caizhongwei');
          }
          $scope.ballTree.choosenum = util.getChooseNumber($scope.currentMethod);
        }

        //滑动
        $scope.slideHasChanged =function($index){
         $scope.choosedType = $index;
       }

       //点球
       $scope.chooseBall = function(ballTree,ball,bt){
        if(bt.h3 == '胆码'){
           for(var i = 0; i < ballTree[0].balls.length; i++){
            if(ballTree[1].balls[i].active == true && ballTree[1].balls[i].cnt == ball.cnt){
              ballTree[1].balls[i].active = false;
            }
            if(ballTree[0].balls[i] == ball){
              continue;
            }
            ballTree[0].balls[i].active = false;    
          }
         
        }else if(bt.h3 == '拖码'){
          for(var i = 0; i < ballTree[1].balls.length; i++){
            if(ballTree[0].balls[i].active == true && ballTree[0].balls[i].cnt == ball.cnt){
                ballTree[0].balls[i].active = false;
            }
          }
        }
        ball.active = !ball.active;
        $scope.count = util.setBets($scope.currentMethod,$scope.ballTree) || 0;
        $scope.basket[$scope.currentMethod] = $scope.ballTree;
        
        //console.log($scope.count);
        //console.log($scope.basket);
          
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
            if(i > 4){
              bt.balls[i].active = true;
            }
          }else if(q.cnt == '小'){
              if(i < 5){
                bt.balls[i].active = true;
              }
          }else if(q.cnt == '清'){
            bt.balls[i].active = false;
          }
        }
        q.active = true;
        $scope.basket[$scope.currentMethod] = $scope.ballTree;
      }

     }]).factory('util',function(){  
      return{
        buildUI:function(titleArr,type){
           var eles = ['01','02','03','04','05','06','07','08','09','10','11','5单0双','4单1双','3单2双','1单3双','1单3双','0单5双','大','小','全','单','双','清'];
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
              
              //选一
              if(typeSplits[0] == 'xuanyi'){
                return this.getCounts(tree,1);
                //选二
              }else if(typeSplits[0] == 'xuaner'){
                var counts = 0;
                if(typeSplits[1] == 'qianerzhixuan'){
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
                }else{
                  return this.getCounts(tree,2);
                }
              }else if(typeSplits[0] == 'xuansan'){
                if(typeSplits[1] == 'qiansanzhixuan'){
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
                  //console.log(arr);
                  return counts;
                }else{
                  return this.getCounts(tree,3);
                }
              }else if(typeSplits[0] == 'xuansi'){
                return this.getCounts(tree,4);
              }else if(typeSplits[0] == 'xuanwu'){
                return this.getCounts(tree,5);
              }else if(typeSplits[0] == 'xuanliu'){
                return this.getCounts(tree,6);
              }else if(typeSplits[0] == 'xuanqi'){
                return this.getCounts(tree,7);
              }else if(typeSplits[0] == 'xuanba'){
                return this.getCounts(tree,8);
              }else if(typeSplits[0] == 'quwei'){
                console.log('趣味');
              }

          }else if(/danshi$/.test(typeSplits[typeSplits.length-1])){  //应该不会用到 
            console.log('单式');
          }else if(/dantuo$/.test(typeSplits[typeSplits.length-1])){
            var arr = [],flag = false;
            for(var i = 0; i < tree[0].balls.length; i++){
              if(tree[1].balls[i].active == true){
                arr.push(tree[1].balls[i].cnt);
              }
              if(tree[0].balls[i].active == true){
                flag = true;
              }
            }
            if(flag && arr.length >= tree.choosenum){
              //console.log(tree);
              console.log(this.getCounts(tree,tree.choosenum));
            }

          }else if(typeSplits[typeSplits.length-1] == 'dingdanshuang'){          
              console.log('定单双');
          }else if(typeSplits[typeSplits.length-1] == 'caizhongwei'){         
              console.log('猜中位');
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
        }

      }
    })
     .controller('drawCtrl', ['$scope', function ($scope) {


     }])
     .controller('submitCtrl',  ['$scope', function ($scope) {


     }])
     .controller('bodyCtrl', ['$scope', function ($scope) {


     }]);



