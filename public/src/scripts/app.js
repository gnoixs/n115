//启动文件,分配路由
angular.module('app',['ionic','ngResource','starter.controllers']).run(['$ionicPlatform',function($ionicPlatform){
		if(window.StatusBar){
			StatusBar.styleDefault();
		}
	}]).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
		$stateProvider.state('pick', {					//选号
				url         : '/pick',
				templateUrl : 'src/tpls/pick.html',
				controller  : 'pickCtrl'
		}).state('draw', {								//投注
			url          : '/draw',
			templateUrl : 'src/tpls/draw.html',
			controller   : 'drawCtrl'
		}).state('intro', {								//游戏玩法
			url          : '/intro',
			templateUrl : 'src/tpls/intro.html',
			controller   : 'introCtrl'
		}).state('submit', {							//提交
			url          : '/submit',
			templateUrl : 'src/tpls/submit.html',
			controller   : 'submitCtrl',
			params       : { totalMoney : 100 }
		});

		if(location.hash = '#/submit'){             
			location.href = location.origin + location.pathname + location.search + "#/pick";
		}
		$urlRouterProvider.otherwise('pick');
		//$ionicConfigProvider.scrolling.jsScrolling(true);
	}]);