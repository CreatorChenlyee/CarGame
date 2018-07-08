type uid = number;

export class trackconfigRow{
	trackid?:uid = 0	//赛道ID
	trackname?:string = ''	//赛道名字
	seasonid?:number = 0	//赛季ID
	drivingLimit?:number = 0	//行驶上限
	pitcount?:number = 0	//赛车位数量
	unlockcarid?:number = 0	//解锁赛车ID
};

var trackconfig:trackconfigRow[]=[
	{ "trackid":1,	"trackname":"街道赛道",	"seasonid":1,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":1},
	{ "trackid":2,	"trackname":"专业赛道",	"seasonid":1,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":7},
	{ "trackid":3,	"trackname":"国内赛道",	"seasonid":1,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":13},
	{ "trackid":4,	"trackname":"国际赛道",	"seasonid":1,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":19},
	{ "trackid":5,	"trackname":"顶级赛道",	"seasonid":1,	"drivingLimit":3,	"pitcount":3,	"unlockcarid":25},
	{ "trackid":6,	"trackname":"街道赛道",	"seasonid":2,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":26},
	{ "trackid":7,	"trackname":"专业赛道",	"seasonid":2,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":32},
	{ "trackid":8,	"trackname":"国内赛道",	"seasonid":2,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":38},
	{ "trackid":9,	"trackname":"国际赛道",	"seasonid":2,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":44},
	{ "trackid":10,	"trackname":"顶级赛道",	"seasonid":2,	"drivingLimit":3,	"pitcount":3,	"unlockcarid":50},
	{ "trackid":11,	"trackname":"街道赛道",	"seasonid":3,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":51},
	{ "trackid":12,	"trackname":"专业赛道",	"seasonid":3,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":57},
	{ "trackid":13,	"trackname":"国内赛道",	"seasonid":3,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":63},
	{ "trackid":14,	"trackname":"国际赛道",	"seasonid":3,	"drivingLimit":10,	"pitcount":17,	"unlockcarid":69},
	{ "trackid":15,	"trackname":"顶级赛道",	"seasonid":3,	"drivingLimit":3,	"pitcount":3,	"unlockcarid":75}
]

export default trackconfig;