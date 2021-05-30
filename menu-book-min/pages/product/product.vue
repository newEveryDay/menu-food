<template>
	<view class="container">
		
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in menuDetail.img" :key="index">
					<view class="image-wrapper">
						<image :src="'http://127.0.0.1:3000/'+item" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{menuDetail.menuName}}</text>

			<view class="bot-row">
				<text>收藏 {{menuDetail.collectNums?menuDetail.collectNums:0}}</text>
				<text>浏览量 {{menuDetail.pageViewNums?menuDetail.pageViewNums:0}}</text>
			</view>
		</view>
		<view class="des">
			{{menuDetail.description}}
		</view>
		<!-- 材料 -->
		<view class="ingredient">
			<view class="header">
				<view class="title">用料</view>
				<view class="basket" @click="basketAction">{{menuIsaddTobasket?'从菜篮子移除':'丢进菜篮子'}}</view>
			</view>
			<view class="ingredient-item" v-for="item in menuDetail.ingredients">
				<view class="menu-name">{{item.foodname}}</view>
				<view class="menu-count">{{item.amount+item.unit}}</view>
			</view>
		</view>


		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<view class="steps">
				<view class="steps-item" v-for="(step,index) in menuDetail.steps">
					<view class="step-title">步骤{{index+1}}</view>
					<image class="img" :src="'http://127.0.0.1:3000/'+step.img"></image>
					<view class="des">{{step.desc}}</view>
				</view>
			</view>
			<!-- <rich-text :nodes="desc"></rich-text> -->
		</view>
		<view class="basket-bt" :class="[menuIsaddTobasket?'hide':'show']">
			<view @click="goBasket">
				<image class="img" src="../../static/basket.png"></image>
			</view>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>分享</text>
			</navigator>
		</view>
		
	</view>
</template>

<script>
	import {Basket} from '@/models/basket.js'
	export default {
		components: {
		},
		data() {
			return {
				menuDetail: {},
				specSelected: [],
				queryMenuDetail: {},
				favorite: false,
				// 订单id
				id: '',
				// 菜谱是否添加入菜篮子中
				menuIsaddTobasket:false
			};
		},
		async onLoad(options) {
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.id = options.id;
			const params = {
				id: this.id
			}
			const result = await this.$common.$service.$menu.getMenuById(params)
			this.getMenuCollect(this.id)
			const menuIsaddTobasket = this.isCheckAddIngredientsTobasket()
			if(menuIsaddTobasket){
				this.menuIsaddTobasket = true
			}else{
				this.menuIsaddTobasket = false
			}
			result.data.img = result.data.img ? result.data.img.split() : [];
			this.menuDetail = result.data
			this.addPageViewNum()
			console.log('this.menuDetail', this.menuDetail)
			const queryResult = await this.$api.json('queryid');
			this.queryMenuDetail = queryResult.result.data[0]
		},
		methods: {
			//收藏
			toFavorite() {
				if (this.favorite) {
					this.cancelCollectMenu()
				} else {
					this.collectMenu()
				}
			},
			// 收藏成功
			collectMenu() {
				const params = {
					id: this.id
				}
				this.$common.$service.$collect.collectMenu(params).then((res) => {
					if (res && res.code == 200) {
						this.favorite = true;
						uni.showToast({
							title: '收藏成功'
						})
					}
				})
			},
			// 取消收藏
			cancelCollectMenu() {
				const params = {
					id: this.id
				}
				this.$common.$service.$collect.cancelCollectMenu(params).then((res) => {
					if (res && res.code == 200) {
						this.favorite = false;
						uni.showToast({
							title: '取消成功'
						})
					}
				})
			},
			buy() {
				uni.navigateTo({
					url: `/pages/order/createOrder`
				})
			},
			// 获取菜谱下的收藏信息
			async getMenuCollect() {
				const result = await this.$common.$service.$menu.getMenuCollect(this.id)
				this.favorite = result.data.collecteStatus
				console.log(result)
			},
			// 添加浏览数量
			addPageViewNum() {
				this.$common.$service.$menu.addPageViewNum(this.id).then(res => {
					console.log('添加成功')
				})
			},
			basketAction(){
				if(!this.menuIsaddTobasket){
					Basket.addIngredientsTobasket(this.menuDetail)
					this.menuIsaddTobasket = true
				}else{
					Basket.dorpIngredientsFrombasket(this.id)
					this.menuIsaddTobasket = false
				}
			},
			// 查询菜谱素材是否放入菜篮子中
			isCheckAddIngredientsTobasket(){
				const ingredientListInfo = uni.getStorageSync('ingredientLists')?JSON.parse(uni.getStorageSync('ingredientLists')):[]
				if(ingredientListInfo.length>0){
					return ingredientListInfo.find((ele) => {
							return (ele.id == this.id)
					})  
				}
			},
			goBasket(){
				uni.navigateTo({
					url:`../basket/basket`
				})
			},

			stopPrevent() {}
		},

	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 600upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
		}

		.price {
			font-size: $font-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				/* flex: 1; */
				padding-right: 40rpx;
			}
		}
	}

	.des {
		font-size: 28rpx;
		line-height: 42rpx;
		color: #999;
		background-color: #fff;
		padding: 0 20rpx;
	}

	/* 分享 */
	.share-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;

		.share-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $uni-color-primary;
			}
		}

		.icon-xingxing {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.tit {
			font-size: $font-base;
			margin-left: 10upx;
		}

		.icon-bangzhu1 {
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}

		.share-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}

		.icon-you {
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}

			.selected {
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		z-index: 95;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 100upx;
		border-radius: 16upx;
		background: #fff;
		border-top: 2rpx solid #ddd;
		bottom: 0;

		.p-b-btn {
			display: flex;
			/* flex-direction: column; */
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}
	}

	.ingredient {

		padding: 20rpx 30rpx;
		background: #fff;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 20rpx;

			.title {
				font-weight: bold;
				font-size: 32rpx;
				color: #333;
			}

			.basket {
				border-radius: 40rpx;
				border: 2rpx solid #d6d7dc;
				font-size: 24rpx;
				color: #666;
				padding: 10rpx 20rpx;
			}
		}

		.ingredient-item {
			font-size: 28rpx;
			color: #333;
			display: flex;
			border-bottom: 2rpx #e6e6e6 solid;
			padding: 20rpx 0;
			justify-content: space-between;
		}
	}

	.steps {
		.steps-item {
			padding: 10rpx 30rpx;
			padding-bottom: 2rpx solid #d6d7dc;

			.step-title {
				color: #333;
				font-size: 28rpx;
				font-weight: bold;
				font-size: 30rpx;
				padding: 20rpx 0;
			}

			.des {
				padding: 30rpx 0;
			}

		}

		.img {
			width: 100%;
		}
	}
	.basket-bt{
		height: 84rpx;
		width: 84rpx;
		background-color: #ff521d;
		border-radius: 128rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: left 2s ;
		position: fixed;
		left: -84rpx;
		bottom: 160rpx;
		.img{
			width: 64rpx;
			height: 64rpx;
		}
		&.show{
			animation: showBasket 0.2s linear both;
		}
		
		&.hide{
			animation: hideBasket 0.2s linear both;
		}
		
		
	}
	@keyframes showBasket {
		0% {
			transform: translateX(120%);
		}
	
		100% {
			transform: translateX(0%);
		}
	}
	
	@keyframes hideBasket {
		0% {
			transform: translateX(0);
		}
	
		100% {
			transform: translateX(120%);
		}
	}
	
</style>
