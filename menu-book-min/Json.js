/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Leo yo',
		portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg'
	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = [{
		src: "/static/temp/banner-1.jpg",
		background: "rgb(203, 87, 60)",
	},
	{
		src: "/static/temp/banner-1.jpg",
		background: "rgb(205, 215, 218)",
	},
	{
		src: "/static/temp/banner-1.jpg",
		background: "rgb(183, 73, 69)",
	}
]
/* 商品列表 */
const goodsList = [{
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
		image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 61,
	},
	{
		image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "潘歌针织连衣裙",
		price: 78,
		sales: 16,
	},
	{
		image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg",
		image2: "http://m.360buyimg.com/n12/jfs/t247/42/1078640382/162559/3628a0b/53f5ad09N0dd79894.jpg%21q70.jpg",
		image3: "http://ikids.61kids.com.cn/upload/2018-12-29/1546070626796114.jpg",
		title: "巧谷2019春夏季新品新款女装",
		price: 108.8,
		sales: 5,
	}, {
		image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=756705744,3505936868&fm=11&gp=0.jpg",
		image2: "http://images.jaadee.com/images/201702/goods_img/30150_d85aed83521.jpg",
		image3: "http://img13.360buyimg.com/popWaterMark/jfs/t865/120/206320620/138889/dcc94caa/550acedcN613e2a9d.jpg",
		title: "私萱连衣裙",
		price: 265,
		sales: 88,
	}, {
		image: "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
		image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
		title: "娇诗茹 ulzzang原宿风学生潮韩版春夏短",
		price: 422,
		sales: 137,
	}, {
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
		image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 95,
	},
]

/* 购物车 */
const cartList = [{
		id: 1,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
		attr_val: '春装款 L',
		stock: 15,
		title: 'OVBE 长袖风衣',
		price: 278.00,
		number: 1
	},
	{
		id: 3,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 3,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 5
	},
	{
		id: 4,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 5,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 6,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 7,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 8,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 15,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 1
	},
	{
		id: 9,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 10,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 11,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 12,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 13,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552405266625&di=a703f2b2cdb0fe7f3f05f62dd91307ab&imgtype=0&src=http%3A%2F%2Fwww.78.cn%2Fzixun%2Fnews%2Fupload%2F20190214%2F1550114706486250.jpg',
		attr_val: '春装款/m',
		stock: 15,
		title: '女装2019春秋新款',
		price: 420.00,
		number: 1
	}
];
//详情展示页面
const detailData = {
	title: '纯种金毛幼犬活体有血统证书',
	title2: '拆家小能手 你值得拥有',
	favorite: true,
	imgList: [{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
		},
		{
			src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
		},
	],
	episodeList: [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	],
	guessList: [{
			src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
			title: '猫眼指甲油',
			title2: '独树一帜的免照灯猫眼指甲'
		},
		{
			src: 'http://m.china-7.net/uploads/14778449362891.jpg',
			title: '创意屋',
			title2: '创意屋形上下双层高低床'
		},
		{
			src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
			title: 'MissCandy 指甲油',
			title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
			title: 'RMK 2017星空海蓝唇釉',
			title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。'
		}
	],
	evaList: [{
			src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '楼上说的好有道理。'
		}
	]
}
const shareList = [{
		type: 1,
		icon: '/static/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]

const orderList = [{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			}
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		goodsList: [{
			title: '古黛妃 短袖t恤女 春夏装2019新款韩版宽松',
			price: 179.5,
			image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
			number: 1,
			attr: '珊瑚粉 M'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2120460599/O1CN01LBPS4C1GINkwsOTXS_!!2120460599.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i2/1069876356/TB2ocTQG4WYBuNjy1zkXXXGGpXa_!!1069876356.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
			price: 69,
			image: 'https://img.alicdn.com/imgextra/i3/2128794607/TB2gzzoc41YBuNjy1zcXXbNcXXa_!!2128794607.jpg_430x430q90.jpg',
			number: 1,
			attr: '白色-高帮 39'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/3358098495/O1CN01dhYyid2Ccl5MWLDok_!!3358098495.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/3358098495/O1CN01AWsnFA2Ccl5OzvqsL_!!3358098495.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg',
			},
			{
				image: 'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg',
			},
		]
	}

]
const cateList = [{
		id: 1,
		name: '零食类'
	},
	{
		id: 2,
		name: '水果色拉'
	},
	{
		id: 3,
		name: '烤面包'
	},
	{
		id: 4,
		name: '鸡肉做法'
	},
	{
		id: 5,
		pid: 1,
		name: '海鲜大全'
	},
	{
		id: 6,
		pid: 1,
		name: '运营商'
	},
	{
		id: 8,
		pid: 5,
		name: '全面屏手机',
		picture: '/static/temp/cate2.jpg'
	},
	{
		id: 9,
		pid: 5,
		name: '游戏手机',
		picture: '/static/temp/cate3.jpg'
	},
	{
		id: 10,
		pid: 5,
		name: '老人机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 11,
		pid: 5,
		name: '拍照手机',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 12,
		pid: 5,
		name: '女性手机',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 14,
		pid: 6,
		name: '合约机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 15,
		pid: 6,
		name: '选好卡',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 16,
		pid: 6,
		name: '办套餐',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 17,
		pid: 2,
		name: '礼品',
	},
	{
		id: 18,
		pid: 2,
		name: '鲜花',
	},
	{
		id: 19,
		pid: 17,
		name: '公益摆件',
		picture: '/static/temp/cate7.jpg'
	},
	{
		id: 20,
		pid: 17,
		name: '创意礼品',
		picture: '/static/temp/cate8.jpg'
	},
	{
		id: 21,
		pid: 18,
		name: '鲜花',
		picture: '/static/temp/cate9.jpg'
	},
	{
		id: 22,
		pid: 18,
		name: '每周一花',
		picture: '/static/temp/cate10.jpg'
	},
	{
		id: 23,
		pid: 18,
		name: '卡通花束',
		picture: '/static/temp/cate11.jpg'
	},
	{
		id: 24,
		pid: 18,
		name: '永生花',
		picture: '/static/temp/cate12.jpg'
	},
	{
		id: 25,
		pid: 3,
		name: '男装'
	},
	{
		id: 26,
		pid: 3,
		name: '女装'
	},
	{
		id: 27,
		pid: 25,
		name: '男士T恤',
		picture: '/static/temp/cate13.jpg'
	},
	{
		id: 28,
		pid: 25,
		name: '男士外套',
		picture: '/static/temp/cate14.jpg'
	},
	{
		id: 29,
		pid: 26,
		name: '裙装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 30,
		pid: 26,
		name: 'T恤',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 31,
		pid: 26,
		name: '上装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 32,
		pid: 26,
		name: '下装',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 33,
		pid: 4,
		name: '奶粉',
	},
	{
		id: 34,
		pid: 4,
		name: '营养辅食',
	},
	{
		id: 35,
		pid: 4,
		name: '童装',
	},
	{
		id: 39,
		pid: 4,
		name: '喂养用品',
	},
	{
		id: 36,
		pid: 33,
		name: '有机奶粉',
		picture: '/static/temp/cate17.jpg'
	},
	{
		id: 37,
		pid: 34,
		name: '果泥/果汁',
		picture: '/static/temp/cate18.jpg'
	},
	{
		id: 39,
		pid: 34,
		name: '面条/粥',
		picture: '/static/temp/cate20.jpg'
	},
	{
		id: 42,
		pid: 35,
		name: '婴童衣橱',
		picture: '/static/temp/cate19.jpg'
	},
	{
		id: 43,
		pid: 39,
		name: '吸奶器',
		picture: '/static/temp/cate21.jpg'
	},
	{
		id: 44,
		pid: 39,
		name: '儿童餐具',
		picture: '/static/temp/cate22.jpg'
	},
	{
		id: 45,
		pid: 39,
		name: '牙胶安抚',
		picture: '/static/temp/cate23.jpg'
	},
	{
		id: 46,
		pid: 39,
		name: '围兜',
		picture: '/static/temp/cate24.jpg'
	},
]

// 菜谱大全
const allFoodMenuquery = {
    "resultcode": "200",
    "reason": "Success",
    "result": {
        "data": [{
            "id": "45",
            "title": "秘制红烧肉",
            "tags": "家常菜;热菜;烧;煎;炖;红烧;炒锅",
            "imtro": "做红烧肉的豆亲们很多，大家对红烧肉的热爱更不用我说，从名字上就能反映出来。一些高手们对红烧肉的认识更是令我佩服，单单就红烧肉的做法、菜谱都看得我是眼花缭乱，口水横流。单纯的红烧肉我平时还真没做过，再不抓紧时间做一回解解馋，不是对不起别人，而是太对不起我自己了！ 这道菜的菜名用了秘制二字来形容，当然是自己根据自己多年吃货的经验想象出来的，我不介意把自己的做法与大家共享，只为大家能同我一样，吃到不同口味的红烧肉。不同的人们根据自己的习惯都有不同的做法，味道也不尽相同。我的秘制的关键就是必须用玫瑰腐乳、冰糖和米醋这三种食材，腐乳和冰糖可以使烧出来的肉色泽红亮，米醋能解腻，令肥肉肥而不腻，此法烧制的红烧肉软糯中略带咸甜，的确回味无穷！",
            "ingredients": "五花肉,500g",
            "burden": "玫瑰腐乳,适量;盐,适量;八角,适量;草果,适量;香叶,适量;料酒,适量;米醋,适量;生姜,适量",
            "albums": ["http:\/\/img.juhe.cn\/cookbook\/t\/0\/45_854851.jpg"],
            "steps": [{
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_0824e37faf00b71e.jpg",
                "step": "1.将五花肉煮至断生状态"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_b6d7329b703f6e85.jpg",
                "step": "2.切成大小一致的块"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_6ee9e8dab0516333.jpg",
                "step": "3.放在锅内煎"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_b9afd6d4dd81f55c.jpg",
                "step": "4.入生姜"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_d0170fbe236421f9.jpg",
                "step": "5.放八角草果各一个，香叶一片"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_639b12210745fa41.jpg",
                "step": "6.放冰糖"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_c25e0cedd2012f45.jpg",
                "step": "7.加料酒"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_eb68327980f022dd.jpg",
                "step": "8.加玫瑰腐乳和腐乳汁及适量盐"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_ac17263a11507a41.jpg",
                "step": "9.加米醋"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_f5489af5d12b4930.jpg",
                "step": "10.加水继续炖"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/45_8e0cf83cb7306281.jpg",
                "step": "11.直至肉变软糯汤汁收干即可"
            }]
        },
        {
            "id": "52",
            "title": "经典红烧肉",
            "tags": "家常菜;咸;半小时-1小时;孕妇;青少年;老人;白领;晚餐;红烧;营养;增强抵抗力;全菜系;1-2人;待客菜;锅子",
            "imtro": "红烧肉是热菜菜谱之一，以五花肉为制作主料，红烧肉的做法各地也会稍有不同。南方习惯用酱油（老抽）调色，而北方则偏爱炒糖色儿，红烧肉也是我拿手菜之一，不管是逢年过节还是亲朋聚会都不会少了诱人的红烧肉。红烧肉的特点；浓油赤酱，肥而不腻，入口酥软即化。",
            "ingredients": "五花肉,1000g",
            "burden": "葱,适量;姜,适量;蒜,适量;八角,2粒;桂皮,1块;干辣椒,1个;酱油,适量;冰糖,适量;盐,适量;料酒,适量",
            "albums": ["http:\/\/img.juhe.cn\/cookbook\/t\/1\/52_759155.jpg"],
            "steps": [{
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_b02a6aa276e3352f.jpg",
                "step": "1.五花肉洗净切成大块。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_0cfde36e8061dd9c.jpg",
                "step": "2.冷水把肉下锅烧开，把肉焯水。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_4bbe9a903c8b144e.jpg",
                "step": "3.准备好 八角 桂皮 葱姜蒜 辣椒。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_887688f6d7716106.jpg",
                "step": "4.把锅烧热，下入焯水的五花肉，小火煸炒至五花肉出油。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_72ddd29b5fba09c3.jpg",
                "step": "5.下入葱姜蒜 八角 桂皮 辣椒继续煸炒至肉色微黄。盛出。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_90765e3bf8a33c53.jpg",
                "step": "6.锅中留底油放入冰糖小火熬至起沫成棕红色。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_95ddaa107b65158b.jpg",
                "step": "7.倒入煸炒的五花肉翻炒均匀，使每块肉均匀沾满糖色，"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_68a1aa355f2c62e9.jpg",
                "step": "8.加入料酒、酱油"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_b4391bab5b4c70b7.jpg",
                "step": "9.加入开水没过肉，盖上锅盖开火煮沸，调小火炖40分钟，"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/52_22e562a234ed1891.jpg",
                "step": "10.烧至肉熟烂、把汤汁收浓即可。"
            }]
        },
        {
            "id": "92",
            "title": "红烧肉",
            "tags": "家常菜;快手菜",
            "imtro": "红烧肉，各地各家的做法稍有不同味道即大不一样，中餐的精妙在于食材随意性而产生的变化，南方习惯用酱油(老抽)调色，而北方则偏爱炒糖色。 女人不要为了保持好身材，刻意与美味的肉类食品绝缘哦。其实，很多科学证明，适当的吃肉并不会增加额外的脂肪。 猪肉经过小火煸炒出油后，炖出来的红炒肉是肥而不腻，软烂入味，非常的好吃美味，也非常适合咱们的健康理念，即少油，又解馋，又解腻，下面，为你推荐这种红烧肉的经典做法，不用一滴油就可以做出美味健康的红烧肉。",
            "ingredients": "猪后臀尖,1000g",
            "burden": "葱段,适量;八角,2个;干辣椒,4个;香叶,4片;桂皮,1块;鲜姜,1块;干山楂片,4片;黄油,适量;老抽,适量;生抽,适量;白糖,适量;开水,适量",
            "albums": ["http:\/\/img.juhe.cn\/cookbook\/t\/1\/92_512827.jpg"],
            "steps": [{
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_472370e29b980b31.jpg",
                "step": "1.猪肉清洗干净切成方块，冷水下锅，水开后撇去上面的浮沫。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_04f90c14513aa139.jpg",
                "step": "2.焯好的肉块捞出，用温水清洗干净。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_50af1fae3911794d.jpg",
                "step": "3.准备好调料：干辣椒，桂皮，香叶，八角，（大蒜也可以不放）。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_12f839ee0920c03b.jpg",
                "step": "4.做锅开小火，不放油，把肉块放入反复煸炒，煸炒至肉块有点焦香，有油渗出，关火把肉块捞出。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_bfdc35cde7da929b.jpg",
                "step": "5.做锅，用肉块煸出的猪油烧热，放入八角，干辣椒，桂皮，香叶煸炒出香味。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_e21dddc1ffcad36b.jpg",
                "step": "6.放入肉块煸炒1-2分钟后捞出备用。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_89ba401801a762fe.jpg",
                "step": "7.用锅中剩下的余油放入2勺白糖（这个量可以根据自己的喜好添加，喜欢吃甜一点的就多放点糖），开小火煸炒白糖。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_33f84ea85dcd11c9.jpg",
                "step": "8.这是糖色变化的过程"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_bbf69240b5f7211d.jpg",
                "step": "9.当糖起小泡，颜色变红就可以了。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_114bbdd5ef3d1255.jpg",
                "step": "10.这时快速烹上1勺热水，加入肉块煸炒至肉块颜色变红。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_831b33673ac8c507.jpg",
                "step": "11.煸炒至猪肉块上色后，加入适量生抽，老抽（不可多放，放多了颜色就发黑了），黄酒煸炒。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_a377c03180cb6b26.jpg",
                "step": "12.加入开水（多放点水，最好一次加足，肉炖熟了可以大火收汤，水少了，中途加水就影响肉质的口感了），再把姜块，葱段，山楂片放入。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_127b81298ad6cf93.jpg",
                "step": "13.盖上锅盖，大火烧开，小火炖煮1个小时。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_59ebcf1a60e54619.jpg",
                "step": "14.炖煮了一个小时了，汤汁也差不多剩一半了，这时加入6克盐（盐可以根据自己的口味添加，在还有汤的情况下，不要尝出咸味正好，等汤汁收浓就会咸了），小火继续炖煮。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_f4cbb0c04220428e.jpg",
                "step": "15.当品尝到肉质软烂，就可以大火收汁，一锅肥而不腻，肉质酥烂，诱人食欲的红烧肉就炖好了，赶快就着小酒，大快朵颐的享受吧"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_372112ff28389c98.jpg",
                "step": "16.炎热的夏季，吃一顿少油，解腻，又美味的红烧肉大餐。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/1\/92_1630281ff0350105.jpg",
                "step": "17.再来一张，想吃吗，那就赶紧动手吧，呵呵。"
            }]
        }],
        "totalNum": "306",
        "pn": "1",
        "rn": "3"
    },
    "error_code": 0
}
// 查看菜谱的所有分类，如菜系、口味等
const category = {
    "resultcode": "200",
    "reason": "Success",
    "result": [
        {
            "parentId": "10001",
            "name": "菜式菜品",
            "list": [
                {
                    "id": "1",
                    "name": "家常菜",
                    "parentId": "10001"
                },
                {
                    "id": "2",
                    "name": "快手菜",
                    "parentId": "10001"
                },
                {
                    "id": "3",
                    "name": "创意菜",
                    "parentId": "10001"
                },
                {
                    "id": "4",
                    "name": "素菜",
                    "parentId": "10001"
                },
                {
                    "id": "5",
                    "name": "凉菜",
                    "parentId": "10001"
                },
                {
                    "id": "6",
                    "name": "烘焙",
                    "parentId": "10001"
                },
                {
                    "id": "7",
                    "name": "面食",
                    "parentId": "10001"
                },
                {
                    "id": "8",
                    "name": "汤",
                    "parentId": "10001"
                },
                {
                    "id": "9",
                    "name": "自制调味料",
                    "parentId": "10001"
                }
            ]
        }
    ],
    "error_code": 0
}
// 按标签检索菜谱
const search = {
    "resultcode": "200",
    "reason": "Success",
    "result": {
        "data": [{
            "id": "909",
            "title": "泰式柠檬蒸鲈鱼",
            "tags": "家常菜;私房菜;海鲜类;美容;瘦身;健脾开胃;护肝;老年人;运动员;骨质疏松;辣;蒸;简单;抗疲劳;鲜;香;孕妇;消化不良;开胃;减肥;柠檬味;补水;补钙;促消化;祛斑;产妇;1-2人;生津止渴;肥胖;养肝护肝;补肝;蒸锅;中等难度;鲈;保湿;增高;晕车",
            "imtro": "菜谱来自电视节目：中华美食频道的《千味坊》 JIMMY老师教的菜，都是一些简单又美味的家常菜，这几天每天中午12点都会收看他的节目。 JIMMY老师教大家怎么看鱼是否新鲜,如果蒸出来后鱼的眼珠是鼓出来的就是新鲜 的.相反眼珠藏在里面就代表不新鲜了.",
            "ingredients": "鲈鱼,1个;柠檬,2个;红椒,6个",
            "burden": "大蒜头,适量;香菜,适量;盐,适量;生姜,适量",
            "albums": ["http:\/\/img.juhe.cn\/cookbook\/t\/1\/909_135871.jpg"],
            "steps": [{
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/10\/909_70d5525103c69d8a.jpg",
                "step": "1.鲈鱼一条，开肚洗净"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/10\/909_3f4a6e5a5ae225ca.jpg",
                "step": "2.柠檬2-3个，生姜一小块，大蒜头，香菜，辣辣的红椒六个"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/10\/909_c8fe915ee6ff3a4c.jpg",
                "step": "3.把鱼切块，用少量盐，料酒腌一下。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/10\/909_79faf1f277616c40.jpg",
                "step": "4.红椒、大蒜、生姜切碎，香菜切碎"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/10\/909_79083ec44dd9406c.jpg",
                "step": "5.把柠檬汁挤出用小碗盛着，放入调味料：鱼露、精盐、鸡精、白糖（多一些白糖）沾一点尝尝，汁不要太酸也不要太甜。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/10\/909_c0b48c233c6fd724.jpg",
                "step": "6.接着把鱼码成形，倒入调好味的柠檬汁，铺上红椒、大蒜、生姜碎。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/10\/909_66c8b71544b8abde.jpg",
                "step": "7.锅内烧开水，把鱼放上去蒸（大火7分钟即可）"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/10\/909_b57104f06672bf2b.jpg",
                "step": "8.蒸好后，，撒上绿色的香菜叶（记住哦！！！这道菜不用放油的哦）"
            }]
        },
        {
            "id": "676",
            "title": "海米烧冬瓜",
            "tags": "家常菜;瘦身;利尿;高血压;湿热质;痛风;感冒;烧;宴请;夏季;咸鲜;降血压;解暑;减肥;水肿;祛斑;消肿;朋友聚餐;发烧;1-2人;利水消肿;清热解暑;清肺;肥胖;祛痘;脂肪肝;锅子;1小时-2小时;去湿气;祛痘美白;肺热",
            "imtro": "冬瓜是可以做的非常非常好吃的蔬菜，海米又是非常的鲜美，二者加在一起，是至上的美味，喜欢的亲可以试试。",
            "ingredients": "海米,200g;冬瓜,150g",
            "burden": "葱,适量;盐,适量;味精,适量;糖,适量;鱼露,适量;酱油,适量;姜,适量",
            "albums": ["http:\/\/img.juhe.cn\/cookbook\/t\/1\/676_623772.jpg"],
            "steps": [{
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/7\/676_77de8d994aa4d1aa.jpg",
                "step": "1.将海米泡几个小时泡开后切成碎末。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/7\/676_d274f345f8e99296.jpg",
                "step": "2.冬瓜切成条状。葱姜切末。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/7\/676_0b6647ac462f6d9d.jpg",
                "step": "3.锅内上热油，下入葱姜炝锅，随即下入冬瓜，有人喜欢先炒香海米，这样很香，我喜欢后放，味道很鲜。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/7\/676_6bf26f2ebd5a9df6.jpg",
                "step": "4.冬瓜略微出一点点水后，放虾米翻炒均匀，加，盐，味精，糖，几滴美及酱油，几滴鱼露可以提鲜，改小火，加盖子慢慢焖熟冬瓜。"
            },
            {
                "img": "http:\/\/img.juhe.cn\/cookbook\/s\/7\/676_e444c1ef4bcc59cd.jpg",
                "step": "5.期间一定要看着，待冬瓜略微透明，立刻打芡出锅即可。"
            }]
        }],
        "totalNum": "150",
        "pn": "0",
        "rn": "2"
    },
    "error_code": 0
}
// 按菜谱ID查看详细
const queryid = {
    "resultcode": "200",
    "reason": "Success",
    "result": {
        "data": [
            {
                "id": "1001",
                "title": "糖醋小排",
                "tags": "浙菜;热菜;儿童;酸甜;快手菜",
                "imtro": "糖醋小排，我估计爱吃的人太多了，要想做好这道菜，关键就是调料汁的配置，老抽不能放的太多，那样颜色太重， 不好看，调料汁调好后，最好尝一下，每个人的口味都会不同的，可以适当微调一下哈！",
                "ingredients": "肋排,500g",
                "burden": "葱,适量;白芝麻,适量;盐,3g;生粉,45g;料酒,30ml;鸡蛋,1个;葱,1小段;姜,3片;老抽,7ml;醋,30ml;白糖,20g;番茄酱,15ml;生抽,15ml;生粉,7g;姜,适量",
                "albums": [
                    "http://img.juhe.cn/cookbook/t/1/1001_253951.jpg"
                ],
                "steps": [
                    {
                        "img": "http://img.juhe.cn/cookbook/s/10/1001_40ec58177e146191.jpg",
                        "step": "1.排骨剁小块，用清水反复清洗，去掉血水"
                    },
                    {
                        "img": "http://img.juhe.cn/cookbook/s/10/1001_034906d012e61fcc.jpg",
                        "step": "2.排骨放入容器中，放入腌料，搅拌均匀，腌制5分钟"
                    },
                    {
                        "img": "http://img.juhe.cn/cookbook/s/10/1001_b04cddaea2a1a604.jpg",
                        "step": "3.锅中放适量油，烧至5成热，倒入排骨，炸至冒青烟时捞出，关火，等油温降至五成热时，开火，再次放入排骨，中火炸至焦黄、熟透捞出"
                    },
                    {
                        "img": "http://img.juhe.cn/cookbook/s/10/1001_56b92264df500f01.jpg",
                        "step": "4.锅中留少许底油，放入葱花、姜片爆香"
                    },
                    {
                        "img": "http://img.juhe.cn/cookbook/s/10/1001_d78c57536a08dc4b.jpg",
                        "step": "5.放入适量炸好的排骨，倒入调料汁，煮至汤汁浓稠时，关火，撒入葱花、白芝麻点缀即可"
                    }
                ]
            }
        ],
        "totalNum": 1,
        "pn": 0,
        "rn": 1
    },
    "error_code": 0
}
export default {
	carouselList,
	cartList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	orderList,
	cateList,
	allFoodMenuquery,
	queryid
}
