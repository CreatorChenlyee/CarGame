export class carconfigRow{
	ID?:number = 0	//ID
	lv?:number = 0	//等级
	carname?:string = ''	//赛车名字
	outputgold?:number = 0	//每秒产出金币
	outputunit?:string = ''	//单位
	trackid?:number = 0	//所属赛道
	cost?:number = 0	//基础购买价格
	costunit?:string = ''	//单位
	circletime?:number = 0	//通过每圈时间（毫秒）
	trackoutputgold?:number = 0	//跑圈每秒产出金币
	trackoutputunit?:string = ''	//单位
}

var carconfig:carconfigRow[]=[
	{ "ID":1,	"lv":1,	"carname":"BENZ smart",	"outputgold":1,	"outputunit":"undefined",	"trackid":1,	"cost":677,	"costunit":"undefined",	"circletime":7000,	"trackoutputgold":1},
	{ "ID":2,	"lv":2,	"carname":"VW 甲壳虫",	"outputgold":3,	"outputunit":"undefined",	"trackid":1,	"cost":1.7,	"costunit":"K",	"circletime":6500,	"trackoutputgold":1},
	{ "ID":3,	"lv":3,	"carname":"BMW mini",	"outputgold":8,	"outputunit":"undefined",	"trackid":1,	"cost":4.3,	"costunit":"K",	"circletime":6000,	"trackoutputgold":1},
	{ "ID":4,	"lv":4,	"carname":"标致 梅甘娜",	"outputgold":19,	"outputunit":"undefined",	"trackid":1,	"cost":10.9,	"costunit":"K",	"circletime":5500,	"trackoutputgold":2},
	{ "ID":5,	"lv":5,	"carname":"三菱 EVO",	"outputgold":42,	"outputunit":"undefined",	"trackid":1,	"cost":27,	"costunit":"K",	"circletime":5000,	"trackoutputgold":4},
	{ "ID":6,	"lv":6,	"carname":"道奇 挑战者",	"outputgold":89,	"outputunit":"undefined",	"trackid":1,	"cost":68,	"costunit":"K",	"circletime":4500,	"trackoutputgold":9},
	{ "ID":7,	"lv":7,	"carname":"雪佛兰 科迈罗SS",	"outputgold":184,	"outputunit":"undefined",	"trackid":2,	"cost":170,	"costunit":"K",	"circletime":7000,	"trackoutputgold":18},
	{ "ID":8,	"lv":8,	"carname":"福特 野马",	"outputgold":375,	"outputunit":"undefined",	"trackid":2,	"cost":425,	"costunit":"K",	"circletime":6500,	"trackoutputgold":38},
	{ "ID":9,	"lv":9,	"carname":"丰田 86",	"outputgold":758,	"outputunit":"undefined",	"trackid":2,	"cost":1.06,	"costunit":"M",	"circletime":6000,	"trackoutputgold":76},
	{ "ID":10,	"lv":10,	"carname":"保时捷 911",	"outputgold":1.52,	"outputunit":"K",	"trackid":2,	"cost":2.65,	"costunit":"M",	"circletime":5500,	"trackoutputgold":152},
	{ "ID":11,	"lv":11,	"carname":"斯巴鲁 WRX STi Type RA NBR Special",	"outputgold":3.06,	"outputunit":"K",	"trackid":2,	"cost":6.6,	"costunit":"M",	"circletime":5000,	"trackoutputgold":306},
	{ "ID":12,	"lv":12,	"carname":"法拉利 599XX",	"outputgold":6.13,	"outputunit":"K",	"trackid":2,	"cost":16.5,	"costunit":"M",	"circletime":4500,	"trackoutputgold":613},
	{ "ID":13,	"lv":13,	"carname":"BMW M2ACL2",	"outputgold":12.2,	"outputunit":"K",	"trackid":3,	"cost":41,	"costunit":"M",	"circletime":7000,	"trackoutputgold":1.22,	"trackoutputunit":"K"},
	{ "ID":14,	"lv":14,	"carname":"阿斯顿马丁 one77",	"outputgold":24.5,	"outputunit":"K",	"trackid":3,	"cost":104,	"costunit":"M",	"circletime":6500,	"trackoutputgold":2.45,	"trackoutputunit":"K"},
	{ "ID":15,	"lv":15,	"carname":"柯尼塞格 regera",	"outputgold":49.1,	"outputunit":"K",	"trackid":3,	"cost":267,	"costunit":"M",	"circletime":6000,	"trackoutputgold":4.91,	"trackoutputunit":"K"},
	{ "ID":16,	"lv":16,	"carname":"Gumpert Apollo Sport",	"outputgold":98.2,	"outputunit":"K",	"trackid":3,	"cost":667,	"costunit":"M",	"circletime":5500,	"trackoutputgold":9.82,	"trackoutputunit":"K"},
	{ "ID":17,	"lv":17,	"carname":"BENZ AMG GT R",	"outputgold":196,	"outputunit":"K",	"trackid":3,	"cost":1.68,	"costunit":"B",	"circletime":5000,	"trackoutputgold":19.6,	"trackoutputunit":"K"},
	{ "ID":18,	"lv":18,	"carname":"nissan GT-R Nismo",	"outputgold":393,	"outputunit":"K",	"trackid":3,	"cost":3.99,	"costunit":"B",	"circletime":4500,	"trackoutputgold":39.300000000000004,	"trackoutputunit":"K"},
	{ "ID":19,	"lv":19,	"carname":"道奇  Viper ACR",	"outputgold":786,	"outputunit":"K",	"trackid":4,	"cost":10,	"costunit":"B",	"circletime":7000,	"trackoutputgold":78.60000000000001,	"trackoutputunit":"K"},
	{ "ID":20,	"lv":20,	"carname":"帕加尼 Zonda R",	"outputgold":1.57,	"outputunit":"M",	"trackid":4,	"cost":25.3,	"costunit":"B",	"circletime":6500,	"trackoutputgold":157,	"trackoutputunit":"K"},
	{ "ID":21,	"lv":21,	"carname":"兰博基尼 Huracan Performante",	"outputgold":3.14,	"outputunit":"M",	"trackid":4,	"cost":63.9,	"costunit":"B",	"circletime":6000,	"trackoutputgold":314,	"trackoutputunit":"K"},
	{ "ID":22,	"lv":22,	"carname":"布加迪 威航",	"outputgold":6.29,	"outputunit":"M",	"trackid":4,	"cost":161,	"costunit":"B",	"circletime":5500,	"trackoutputgold":629,	"trackoutputunit":"K"},
	{ "ID":23,	"lv":23,	"carname":"法拉利 LaFerrari",	"outputgold":12.5,	"outputunit":"M",	"trackid":4,	"cost":0,	"costunit":"undefined",	"circletime":5000,	"trackoutputgold":1.25,	"trackoutputunit":"M"},
	{ "ID":24,	"lv":24,	"carname":"迈凯伦 P1GTR",	"outputgold":25.1,	"outputunit":"M",	"trackid":4,	"cost":0,	"costunit":"undefined",	"circletime":4500,	"trackoutputgold":2.5100000000000002,	"trackoutputunit":"M"},
	{ "ID":25,	"lv":25,	"carname":"保时捷 956",	"outputgold":50.3,	"outputunit":"M",	"trackid":5,	"cost":0,	"costunit":"undefined",	"circletime":3000,	"trackoutputgold":5.03,	"trackoutputunit":"M"},
	{ "ID":26,	"lv":26,	"carname":"桑塔纳1",	"outputgold":419,	"outputunit":"K",	"trackid":6,	"cost":253,	"costunit":"M",	"circletime":7000,	"trackoutputgold":41.900000000000006,	"trackoutputunit":"K"},
	{ "ID":27,	"lv":27,	"carname":"桑塔纳2",	"outputgold":1.25,	"outputunit":"M",	"trackid":6,	"cost":654,	"costunit":"M",	"circletime":6500,	"trackoutputgold":125,	"trackoutputunit":"K"},
	{ "ID":28,	"lv":28,	"carname":"桑塔纳3",	"outputgold":3.35,	"outputunit":"M",	"trackid":6,	"cost":1.7,	"costunit":"B",	"circletime":6000,	"trackoutputgold":335,	"trackoutputunit":"K"},
	{ "ID":29,	"lv":29,	"carname":"桑塔纳4",	"outputgold":7.96,	"outputunit":"M",	"trackid":6,	"cost":4.8,	"costunit":"B",	"circletime":5500,	"trackoutputgold":796,	"trackoutputunit":"K"},
	{ "ID":30,	"lv":30,	"carname":"桑塔纳5",	"outputgold":17.6,	"outputunit":"M",	"trackid":6,	"cost":11.8,	"costunit":"B",	"circletime":5000,	"trackoutputgold":1.7600000000000002,	"trackoutputunit":"M"},
	{ "ID":31,	"lv":31,	"carname":"桑塔纳6",	"outputgold":37.3,	"outputunit":"M",	"trackid":6,	"cost":32.5,	"costunit":"B",	"circletime":4500,	"trackoutputgold":3.73,	"trackoutputunit":"M"},
	{ "ID":32,	"lv":32,	"carname":"桑塔纳7",	"outputgold":77.1,	"outputunit":"M",	"trackid":7,	"cost":82.5,	"costunit":"B",	"circletime":7000,	"trackoutputgold":7.71,	"trackoutputunit":"M"},
	{ "ID":33,	"lv":33,	"carname":"桑塔纳8",	"outputgold":157,	"outputunit":"M",	"trackid":7,	"cost":209,	"costunit":"B",	"circletime":6500,	"trackoutputgold":15.700000000000001,	"trackoutputunit":"M"},
	{ "ID":34,	"lv":34,	"carname":"桑塔纳9",	"outputgold":317,	"outputunit":"M",	"trackid":7,	"cost":550,	"costunit":"B",	"circletime":6000,	"trackoutputgold":31.700000000000003,	"trackoutputunit":"M"},
	{ "ID":35,	"lv":35,	"carname":"桑塔纳10",	"outputgold":639,	"outputunit":"M",	"trackid":7,	"cost":1.45,	"costunit":"T",	"circletime":5500,	"trackoutputgold":63.900000000000006,	"trackoutputunit":"M"},
	{ "ID":36,	"lv":36,	"carname":"桑塔纳11",	"outputgold":1.28,	"outputunit":"B",	"trackid":7,	"cost":3.6,	"costunit":"T",	"circletime":5000,	"trackoutputgold":128,	"trackoutputunit":"M"},
	{ "ID":37,	"lv":37,	"carname":"桑塔纳12",	"outputgold":2.57,	"outputunit":"B",	"trackid":7,	"cost":9.5,	"costunit":"T",	"circletime":4500,	"trackoutputgold":257,	"trackoutputunit":"M"},
	{ "ID":38,	"lv":38,	"carname":"桑塔纳13",	"outputgold":5.14,	"outputunit":"B",	"trackid":8,	"cost":24.9,	"costunit":"T",	"circletime":7000,	"trackoutputgold":514,	"trackoutputunit":"M"},
	{ "ID":39,	"lv":39,	"carname":"桑塔纳14",	"outputgold":10.3,	"outputunit":"B",	"trackid":8,	"cost":65,	"costunit":"T",	"circletime":6500,	"trackoutputgold":1.03,	"trackoutputunit":"B"},
	{ "ID":40,	"lv":40,	"carname":"桑塔纳15",	"outputgold":20.6,	"outputunit":"B",	"trackid":8,	"cost":169,	"costunit":"T",	"circletime":6000,	"trackoutputgold":2.06,	"trackoutputunit":"B"},
	{ "ID":41,	"lv":41,	"carname":"桑塔纳16",	"outputgold":41.2,	"outputunit":"B",	"trackid":8,	"cost":430,	"costunit":"T",	"circletime":5500,	"trackoutputgold":4.12,	"trackoutputunit":"B"},
	{ "ID":42,	"lv":42,	"carname":"桑塔纳17",	"outputgold":82.4,	"outputunit":"B",	"trackid":8,	"cost":1.13,	"costunit":"aa",	"circletime":5000,	"trackoutputgold":8.24,	"trackoutputunit":"B"},
	{ "ID":43,	"lv":43,	"carname":"桑塔纳18",	"outputgold":164,	"outputunit":"B",	"trackid":8,	"cost":2.9,	"costunit":"aa",	"circletime":4500,	"trackoutputgold":16.400000000000002,	"trackoutputunit":"B"},
	{ "ID":44,	"lv":44,	"carname":"桑塔纳19",	"outputgold":329,	"outputunit":"B",	"trackid":9,	"cost":7.6,	"costunit":"aa",	"circletime":7000,	"trackoutputgold":32.9,	"trackoutputunit":"B"},
	{ "ID":45,	"lv":45,	"carname":"桑塔纳20",	"outputgold":659,	"outputunit":"B",	"trackid":9,	"cost":20,	"costunit":"aa",	"circletime":6500,	"trackoutputgold":65.9,	"trackoutputunit":"B"},
	{ "ID":46,	"lv":46,	"carname":"桑塔纳21",	"outputgold":1.31,	"outputunit":"T",	"trackid":9,	"cost":51.6,	"costunit":"aa",	"circletime":6000,	"trackoutputgold":131,	"trackoutputunit":"B"},
	{ "ID":47,	"lv":47,	"carname":"桑塔纳22",	"outputgold":2.63,	"outputunit":"T",	"trackid":9,	"cost":136,	"costunit":"aa",	"circletime":5500,	"trackoutputgold":263,	"trackoutputunit":"B"},
	{ "ID":48,	"lv":48,	"carname":"桑塔纳23",	"outputgold":5.27,	"outputunit":"T",	"trackid":9,	"cost":0,	"costunit":"undefined",	"circletime":5000,	"trackoutputgold":527,	"trackoutputunit":"B"},
	{ "ID":49,	"lv":49,	"carname":"桑塔纳24",	"outputgold":10.5,	"outputunit":"T",	"trackid":9,	"cost":0,	"costunit":"undefined",	"circletime":4500,	"trackoutputgold":1.05,	"trackoutputunit":"T"},
	{ "ID":50,	"lv":50,	"carname":"桑塔纳25",	"outputgold":21.1,	"outputunit":"T",	"trackid":10,	"cost":0,	"costunit":"undefined",	"circletime":3000,	"trackoutputgold":2.1100000000000003,	"trackoutputunit":"T"},
	{ "ID":51,	"lv":51,	"carname":"红旗1",	"outputgold":175,	"outputunit":"B",	"trackid":11,	"cost":105,	"costunit":"T",	"circletime":7000,	"trackoutputgold":17.5,	"trackoutputunit":"B"},
	{ "ID":52,	"lv":52,	"carname":"红旗2",	"outputgold":527,	"outputunit":"B",	"trackid":11,	"cost":279,	"costunit":"T",	"circletime":6500,	"trackoutputgold":52.7,	"trackoutputunit":"B"},
	{ "ID":53,	"lv":53,	"carname":"红旗3",	"outputgold":1.4,	"outputunit":"T",	"trackid":11,	"cost":741,	"costunit":"T",	"circletime":6000,	"trackoutputgold":140,	"trackoutputunit":"B"},
	{ "ID":54,	"lv":54,	"carname":"红旗4",	"outputgold":3.34,	"outputunit":"T",	"trackid":11,	"cost":1.96,	"costunit":"aa",	"circletime":5500,	"trackoutputgold":334,	"trackoutputunit":"B"},
	{ "ID":55,	"lv":55,	"carname":"红旗5",	"outputgold":7.38,	"outputunit":"T",	"trackid":11,	"cost":5.2,	"costunit":"aa",	"circletime":5000,	"trackoutputgold":738,	"trackoutputunit":"B"},
	{ "ID":56,	"lv":56,	"carname":"红旗6",	"outputgold":15.6,	"outputunit":"T",	"trackid":11,	"cost":13.7,	"costunit":"aa",	"circletime":4500,	"trackoutputgold":1.56,	"trackoutputunit":"T"},
	{ "ID":57,	"lv":57,	"carname":"红旗7",	"outputgold":32.3,	"outputunit":"T",	"trackid":12,	"cost":36.5,	"costunit":"aa",	"circletime":7000,	"trackoutputgold":3.23,	"trackoutputunit":"T"},
	{ "ID":58,	"lv":58,	"carname":"红旗8",	"outputgold":65.9,	"outputunit":"T",	"trackid":12,	"cost":96.8,	"costunit":"aa",	"circletime":6500,	"trackoutputgold":6.590000000000001,	"trackoutputunit":"T"},
	{ "ID":59,	"lv":59,	"carname":"红旗9",	"outputgold":133,	"outputunit":"T",	"trackid":12,	"cost":256,	"costunit":"aa",	"circletime":6000,	"trackoutputgold":13.3,	"trackoutputunit":"T"},
	{ "ID":60,	"lv":60,	"carname":"红旗10",	"outputgold":268,	"outputunit":"T",	"trackid":12,	"cost":680,	"costunit":"aa",	"circletime":5500,	"trackoutputgold":26.8,	"trackoutputunit":"T"},
	{ "ID":61,	"lv":61,	"carname":"红旗11",	"outputgold":538,	"outputunit":"T",	"trackid":12,	"cost":1.8,	"costunit":"bb",	"circletime":5000,	"trackoutputgold":53.800000000000004,	"trackoutputunit":"T"},
	{ "ID":62,	"lv":62,	"carname":"红旗12",	"outputgold":1.07,	"outputunit":"aa",	"trackid":12,	"cost":4.77,	"costunit":"bb",	"circletime":4500,	"trackoutputgold":107,	"trackoutputunit":"T"},
	{ "ID":63,	"lv":63,	"carname":"红旗13",	"outputgold":2.15,	"outputunit":"aa",	"trackid":13,	"cost":12.6,	"costunit":"bb",	"circletime":7000,	"trackoutputgold":215,	"trackoutputunit":"T"},
	{ "ID":64,	"lv":64,	"carname":"红旗14",	"outputgold":4.32,	"outputunit":"aa",	"trackid":13,	"cost":33.5,	"costunit":"bb",	"circletime":6500,	"trackoutputgold":432,	"trackoutputunit":"T"},
	{ "ID":65,	"lv":65,	"carname":"红旗15",	"outputgold":8.64,	"outputunit":"aa",	"trackid":13,	"cost":88.9,	"costunit":"bb",	"circletime":6000,	"trackoutputgold":864,	"trackoutputunit":"T"},
	{ "ID":66,	"lv":66,	"carname":"红旗16",	"outputgold":17.2,	"outputunit":"aa",	"trackid":13,	"cost":235,	"costunit":"bb",	"circletime":5500,	"trackoutputgold":1.72,	"trackoutputunit":"aa"},
	{ "ID":67,	"lv":67,	"carname":"红旗17",	"outputgold":34.5,	"outputunit":"aa",	"trackid":13,	"cost":624,	"costunit":"bb",	"circletime":5000,	"trackoutputgold":3.45,	"trackoutputunit":"aa"},
	{ "ID":68,	"lv":68,	"carname":"红旗18",	"outputgold":69.1,	"outputunit":"aa",	"trackid":13,	"cost":1.65,	"costunit":"cc",	"circletime":4500,	"trackoutputgold":6.91,	"trackoutputunit":"aa"},
	{ "ID":69,	"lv":69,	"carname":"红旗19",	"outputgold":138,	"outputunit":"aa",	"trackid":14,	"cost":4.38,	"costunit":"cc",	"circletime":7000,	"trackoutputgold":13.8,	"trackoutputunit":"aa"},
	{ "ID":70,	"lv":70,	"carname":"红旗20",	"outputgold":276,	"outputunit":"aa",	"trackid":14,	"cost":11.6,	"costunit":"cc",	"circletime":6500,	"trackoutputgold":27.6,	"trackoutputunit":"aa"},
	{ "ID":71,	"lv":71,	"carname":"红旗21",	"outputgold":553,	"outputunit":"aa",	"trackid":14,	"cost":30.7,	"costunit":"cc",	"circletime":6000,	"trackoutputgold":55.300000000000004,	"trackoutputunit":"aa"},
	{ "ID":72,	"lv":72,	"carname":"红旗22",	"outputgold":1.1,	"outputunit":"bb",	"trackid":14,	"cost":81.5,	"costunit":"cc",	"circletime":5500,	"trackoutputgold":110,	"trackoutputunit":"aa"},
	{ "ID":73,	"lv":73,	"carname":"红旗23",	"outputgold":2.21,	"outputunit":"bb",	"trackid":14,	"cost":0,	"costunit":"undefined",	"circletime":5000,	"trackoutputgold":221,	"trackoutputunit":"aa"},
	{ "ID":74,	"lv":74,	"carname":"红旗24",	"outputgold":4.42,	"outputunit":"bb",	"trackid":14,	"cost":0,	"costunit":"undefined",	"circletime":4500,	"trackoutputgold":442,	"trackoutputunit":"aa"},
	{ "ID":75,	"lv":75,	"carname":"红旗25",	"outputgold":8.85,	"outputunit":"bb",	"trackid":15,	"cost":0,	"costunit":"undefined",	"circletime":3000,	"trackoutputgold":885,	"trackoutputunit":"aa"}
]

export default carconfig;
