(function (host, name, Event, undefined) {
    var gameConfigData = {
        "gameType": "sd115",
        "gameTypeCn": "山东11选5",
        "defaultMethod": "xuanwu.renxuanwuzhongwu.fushi",
        "lotteryId": 99301,
        "userLvl": 2,
        "userId": 1198908,
        "userName": "luck888",
        "awardRetStatus": 1,
        "awardGroupRetStatus": 0,
        "lhcStatus": 1,
        "backOutStartFee": 0,
        "backOutRadio": 0,
        "isSupport2000": true,
        "isfirstimeuse2000": false,
        "isfirstimeusediamond2000": false,
        "gameMethods": [{
            "title": "选一",
            "name": "xuanyi",
            "isdiamond": null,
            "isNew": 0,
            "childs": [{
                "title": "前三一码不定位",
                "name": "qiansanyimabudingwei",
                "parent": "xuanyi",
                "childs": [{"title": "复式", "name": "fushi", "parent": "qiansanyimabudingwei", "mode": "xuanyi"}]
            }, {
                "title": "定位胆",
                "name": "dingweidan",
                "parent": "xuanyi",
                "childs": [{"title": "复式", "name": "fushi", "parent": "dingweidan", "mode": "xuanyi"}]
            }, {
                "title": "任选一中一",
                "name": "renxuanyizhongyi",
                "parent": "xuanyi",
                "childs": [{
                    "title": "复式",
                    "name": "fushi",
                    "parent": "renxuanyizhongyi",
                    "mode": "xuanyi"
                }, {"title": "单式", "name": "danshi", "parent": "renxuanyizhongyi", "mode": "xuanyi"}]
            }],
            "gameType": null,
            "gameTypeCn": null,
            "gameTips": null
        }, {
            "title": "选二",
            "name": "xuaner",
            "isdiamond": null,
            "isNew": 0,
            "childs": [{
                "title": "前二直选",
                "name": "qianerzhixuan",
                "parent": "xuaner",
                "childs": [{
                    "title": "复式",
                    "name": "zhixuanfushi",
                    "parent": "qianerzhixuan",
                    "mode": "xuaner"
                }, {"title": "单式", "name": "zhixuandanshi", "parent": "qianerzhixuan", "mode": "xuaner"}]
            }, {
                "title": "前二组选",
                "name": "qianerzuxuan",
                "parent": "xuaner",
                "childs": [{
                    "title": "复式",
                    "name": "zuxuanfushi",
                    "parent": "qianerzuxuan",
                    "mode": "xuaner"
                }, {"title": "单式", "name": "zuxuandanshi", "parent": "qianerzuxuan", "mode": "xuaner"}, {
                    "title": "胆拖",
                    "name": "zuxuandantuo",
                    "parent": "qianerzuxuan",
                    "mode": "xuaner"
                }]
            }, {
                "title": "任选二中二",
                "name": "renxuanerzhonger",
                "parent": "xuaner",
                "childs": [{
                    "title": "复式",
                    "name": "renxuanfushi",
                    "parent": "renxuanerzhonger",
                    "mode": "xuaner"
                }, {
                    "title": "单式",
                    "name": "renxuandanshi",
                    "parent": "renxuanerzhonger",
                    "mode": "xuaner"
                }, {"title": "胆拖", "name": "renxuandantuo", "parent": "renxuanerzhonger", "mode": "xuaner"}]
            }],
            "gameType": null,
            "gameTypeCn": null,
            "gameTips": null
        }, {
            "title": "选三",
            "name": "xuansan",
            "isdiamond": null,
            "isNew": 0,
            "childs": [{
                "title": "前三直选",
                "name": "qiansanzhixuan",
                "parent": "xuansan",
                "childs": [{
                    "title": "复式",
                    "name": "zhixuanfushi",
                    "parent": "qiansanzhixuan",
                    "mode": "xuansan"
                }, {"title": "单式", "name": "zhixuandanshi", "parent": "qiansanzhixuan", "mode": "xuansan"}]
            }, {
                "title": "前三组选",
                "name": "qiansanzuxuan",
                "parent": "xuansan",
                "childs": [{
                    "title": "复式",
                    "name": "zuxuanfushi",
                    "parent": "qiansanzuxuan",
                    "mode": "xuansan"
                }, {
                    "title": "单式",
                    "name": "zuxuandanshi",
                    "parent": "qiansanzuxuan",
                    "mode": "xuansan"
                }, {"title": "胆拖", "name": "zuxuandantuo", "parent": "qiansanzuxuan", "mode": "xuansan"}]
            }, {
                "title": "任选三中三",
                "name": "renxuansanzhongsan",
                "parent": "xuansan",
                "childs": [{
                    "title": "复式",
                    "name": "renxuanfushi",
                    "parent": "renxuansanzhongsan",
                    "mode": "xuansan"
                }, {
                    "title": "单式",
                    "name": "renxuandanshi",
                    "parent": "renxuansanzhongsan",
                    "mode": "xuansan"
                }, {"title": "胆拖", "name": "renxuandantuo", "parent": "renxuansanzhongsan", "mode": "xuansan"}]
            }],
            "gameType": null,
            "gameTypeCn": null,
            "gameTips": null
        }, {
            "title": "选四",
            "name": "xuansi",
            "isdiamond": null,
            "isNew": 0,
            "childs": [{
                "title": "任选四中四",
                "name": "renxuansizhongsi",
                "parent": "xuansi",
                "childs": [{
                    "title": "复式",
                    "name": "fushi",
                    "parent": "renxuansizhongsi",
                    "mode": "xuansi"
                }, {"title": "单式", "name": "danshi", "parent": "renxuansizhongsi", "mode": "xuansi"}, {
                    "title": "胆拖",
                    "name": "dantuo",
                    "parent": "renxuansizhongsi",
                    "mode": "xuansi"
                }]
            }],
            "gameType": null,
            "gameTypeCn": null,
            "gameTips": null
        }, {
            "title": "选五",
            "name": "xuanwu",
            "isdiamond": null,
            "isNew": 0,
            "childs": [{
                "title": "任选五中五",
                "name": "renxuanwuzhongwu",
                "parent": "xuanwu",
                "childs": [{
                    "title": "复式",
                    "name": "fushi",
                    "parent": "renxuanwuzhongwu",
                    "mode": "xuanwu"
                }, {"title": "单式", "name": "danshi", "parent": "renxuanwuzhongwu", "mode": "xuanwu"}, {
                    "title": "胆拖",
                    "name": "dantuo",
                    "parent": "renxuanwuzhongwu",
                    "mode": "xuanwu"
                }]
            }],
            "gameType": null,
            "gameTypeCn": null,
            "gameTips": null
        }, {
            "title": "选六",
            "name": "xuanliu",
            "isdiamond": null,
            "isNew": 0,
            "childs": [{
                "title": "任选六中五",
                "name": "renxuanliuzhongwu",
                "parent": "xuanliu",
                "childs": [{
                    "title": "复式",
                    "name": "fushi",
                    "parent": "renxuanliuzhongwu",
                    "mode": "xuanliu"
                }, {"title": "单式", "name": "danshi", "parent": "renxuanliuzhongwu", "mode": "xuanliu"}, {
                    "title": "胆拖",
                    "name": "dantuo",
                    "parent": "renxuanliuzhongwu",
                    "mode": "xuanliu"
                }]
            }],
            "gameType": null,
            "gameTypeCn": null,
            "gameTips": null
        }, {
            "title": "选七",
            "name": "xuanqi",
            "isdiamond": null,
            "isNew": 0,
            "childs": [{
                "title": "任选七中五",
                "name": "renxuanqizhongwu",
                "parent": "xuanqi",
                "childs": [{
                    "title": "复式",
                    "name": "fushi",
                    "parent": "renxuanqizhongwu",
                    "mode": "xuanqi"
                }, {"title": "单式", "name": "danshi", "parent": "renxuanqizhongwu", "mode": "xuanqi"}, {
                    "title": "胆拖",
                    "name": "dantuo",
                    "parent": "renxuanqizhongwu",
                    "mode": "xuanqi"
                }]
            }],
            "gameType": null,
            "gameTypeCn": null,
            "gameTips": null
        }, {
            "title": "选八",
            "name": "xuanba",
            "isdiamond": null,
            "isNew": 0,
            "childs": [{
                "title": "任选八中五",
                "name": "renxuanbazhongwu",
                "parent": "xuanba",
                "childs": [{
                    "title": "复式",
                    "name": "fushi",
                    "parent": "renxuanbazhongwu",
                    "mode": "xuanba"
                }, {"title": "单式", "name": "danshi", "parent": "renxuanbazhongwu", "mode": "xuanba"}, {
                    "title": "胆拖",
                    "name": "dantuo",
                    "parent": "renxuanbazhongwu",
                    "mode": "xuanba"
                }]
            }],
            "gameType": null,
            "gameTypeCn": null,
            "gameTips": null
        }, {
            "title": "趣味",
            "name": "quwei",
            "isdiamond": null,
            "isNew": 0,
            "childs": [{
                "title": "趣味",
                "name": "normal",
                "parent": "quwei",
                "childs": [{
                    "title": "定单双",
                    "name": "dingdanshuang",
                    "parent": "normal",
                    "mode": "quwei"
                }, {"title": "猜中位", "name": "caizhongwei", "parent": "normal", "mode": "quwei"}]
            }],
            "gameType": null,
            "gameTypeCn": null,
            "gameTips": null
        }],
        "awardGroups": [{
            "gid": 24,
            "awardGroupId": 11659545,
            "awardName": "奖金组1782",
            "betType": 1,
            "directRet": 350,
            "threeoneRet": 350,
            "superRet": 0,
            "lhcYear": 0,
            "lhcColor": 0,
            "createTime": 1420525847834,
            "updateTimte": 1420525847834,
            "awardGroupRetStatus": 0
        }],
        "dynamicConfigUrl": "/gameBet/sd115/dynamicConfig",
        "uploadPath": "/gameBet/sd115/betFile",
        "queryUserBalUrl": "/gameBet/queryUserBal",
        "getUserOrdersUrl": "/gameBet/sd115/getUserOrders",
        "getUserPlansUrl": "/gameBet/sd115/getUserPlans",
        "getHandingChargeUrl": "/gameBet/sd115/handlingCharge?amount=",
        "getBetAwardUrl": "/gameBet/sd115/getBetAward",
        "getHotColdUrl": "/gameBet/sd115/frequency",
        "trendChartUrl": "/gameBet/sd115/trendChart?type=",
        "getLotteryLogoPath": "/static/images/game/logos/logo-sd115.png",
        "queryGameUserAwardGroupByLotteryIdUrl": "/gameBet/sd115/queryGameUserAwardGroupByLotteryId",
        "saveProxyBetGameAwardGroupUrl": "/gameBet/sd115/saveBetAward",
        "sumbitUrl": "/gameBet/sd115/submit",
        "indexInit": "/gameBet/sd115/indexInit",
        "poolBouns": null,
        "isLotteryStopSale": false,
        "lastNumberUrl": "/gameBet/sd115/lastNumber",
        "sourceList": [],
        "helpLink": "/help/queryLotteryDetail?helpId=880",
        "chips": [1, 2, 5, 10, 20, 50, 100, 500, 1000, 5000],
        "chipsSelected": [10, 20, 50, 100, 500],
        "ballLists": null,
        "gameOdds": null,
        "gameZodiac": null,
        "gameTips": null,
        "queryStraightOddsUrl": "/gameBet/sd115/straightOdds",
        "playerBetUrl": null,
        "winningListUrl": null,
        "headImg": null,
        "userNickName": null,
        "uploadUserInfo": null
    };
    var defConfig = {
            //当前彩种名称
            gameType: gameConfigData['gameType'],
            gameTypeCn: gameConfigData['gameTypeCn'],
            lotteryId: gameConfigData['lotteryId'],
            awardGroups: gameConfigData['awardGroups'],
            userId: gameConfigData['userId'],
            userName: gameConfigData['userName'],
            userLvl: gameConfigData['userLvl'],
            awardRetStatus: gameConfigData['awardRetStatus'],
            awardGroupRetStatus: gameConfigData['awardGroupRetStatus'],
            backOutStartFee: gameConfigData['backOutStartFee'],
            backOutRadio: gameConfigData['backOutRadio'],
            isSupport2000: gameConfigData['isSupport2000'],
            isLotteryStopSale: gameConfigData['isLotteryStopSale'],
            isfirstimeuse2000: gameConfigData['isfirstimeuse2000'],
            isfirstimeusediamond2000: gameConfigData['isfirstimeusediamond2000'],
            helpLink: gameConfigData['helpLink'],
            sourceList: gameConfigData['sourceList']
        },
        instance;
    var pros = {
        init: function () {
            var me = this;
            me.types = gameConfigData['gameMethods'];
        },
        //获取玩法类型
        getTypes: function (isFilterClose) {
            return this.types;
        },
        getGameTypeCn: function () {
            return this.defConfig.gameTypeCn;
        },
        getDefaultMethod: function () {
            return gameConfigData['defaultMethod'];
        },
        //获取动态配置接口地址
        getDynamicConfigUrl: function () {
            return gameConfigData['dynamicConfigUrl'];
        },
        //获取单式上传接口地址
        getUploadPath: function () {
            return gameConfigData['uploadPath'];
        },
        //获取用户余额
        getUserBalUrl: function () {
            return gameConfigData['queryUserBalUrl'];
        },
        //获取投注页面显示订单接口地址
        getUserOrdersUrl: function () {
            return gameConfigData['getUserOrdersUrl'];
        },
        //获取单式上传接口地址
        getUserPlansUrl: function () {
            return gameConfigData['getUserPlansUrl'];
        },
        //获取撤销手续费接口地址
        getHandingChargeUrl: function () {
            return gameConfigData['getHandingChargeUrl'];
        },
        //获取彩种logo地址
        getLotteryLogoPath: function () {
            return gameConfigData['getLotteryLogoPath'];
        },
        //获取玩法走势图接口地址
        trendChartUrl: function () {
            return gameConfigData['trendChartUrl'];
        },
        //查询玩法描述和默认冷热球及用户投注方式奖金接口地址
        getBetAwardUrl: function () {
            return gameConfigData['getBetAwardUrl'];
        },
        //获取冷热遗漏接口地址
        getHotColdUrl: function () {
            return gameConfigData['getHotColdUrl'];
        },
        //查询奖金组
        getQueryGameUserAwardGroupByLotteryIdUrl: function () {
            return gameConfigData['queryGameUserAwardGroupByLotteryIdUrl'];
        },
        //保存代理投注奖金组
        getSaveProxyBetGameAwardGroupUrl: function () {
            return gameConfigData['saveProxyBetGameAwardGroupUrl'];
        },
        //获取投注提交接口地址
        submitUrl: function () {
            return gameConfigData['sumbitUrl'];
        },
        //获取首页接口
        indexInitUrl: function () {
            return gameConfigData['indexInit'];
        },
        //获取最新开奖号码
        lastNumberUrl: function () {
            return gameConfigData['lastNumberUrl'];
        },
        //name  wuxing.zhixuan.fushi
        getTitleByName: function (name) {
            var me = this,
                nameArr = name.split('.'),
                nameLen = nameArr.length,
                types = me.types,
                i = 0,
                len = types.length,
                i2,
                len2,
                i3,
                len3,
                tempArr = [],
                result = [];
            //循环一级
            for (; i < len; i++) {
                if (types[i]['name'] == nameArr[0]) {
                    if (gameConfigData['gameType'].indexOf('115') < 0) {
                        result.push(types[i]['title'].replace(/&nbsp;/g, ''));
                    }
                    if (nameLen > 1 && types[i]['childs'].length > 0) {
                        tempArr = types[i]['childs'];
                        len2 = tempArr.length;
                        //循环二级
                        for (i2 = 0; i2 < len2; i2++) {
                            //console.log(tempArr[i2]['name']);
                            if (tempArr[i2]['name'] == nameArr[1]) {
                                if (gameConfigData['gameType'].indexOf('115') > 0) {
                                    result.push(tempArr[i2]['title'].replace(/&nbsp;/g, ''));
                                }
                                if (nameLen > 2 && tempArr[i2]['childs'].length > 0) {
                                    tempArr = tempArr[i2]['childs'];
                                    len3 = tempArr.length;
                                    //循环三级
                                    for (i3 = 0; i3 < len3; i3++) {
                                        if (tempArr[i3]['name'] == nameArr[2]) {
                                            if (tempArr[i3]['headline']) {
                                                return tempArr[i3]['headline'];
                                            }
                                            if ($.inArray(tempArr[i3]['title'].replace(/&nbsp;/g, ''), result) == -1) {
                                                result.push(tempArr[i3]['title'].replace(/&nbsp;/g, ''));
                                            }
                                            return result;
                                        }
                                    }
                                } else {
                                    return result;
                                }
                            }
                        }
                    } else {
                        return result;
                    }
                }
            }
            return '';
        }

    };

    var Main = host.Class(pros, Event);
    Main.defConfig = defConfig;
    Main.getInstance = function (cfg) {
        return instance || (instance = new Main(cfg));
    };
    host.Games.N115[name] = Main;

})(phoenix, "Config", phoenix.Event);