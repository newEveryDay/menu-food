<template>
	<view class="basket">
		<view class="basket-content">
			<view class="basket-item" v-for="(item,basketIndex) in basketList" :key="item.id">
				<view class="header">
					<view class="title">{{item.menuName}}</view>
					<view class="arrow">></view>
				</view>
				<view class="action">
					<view class="add-ingredient ingredient" @click="addIngredientItem(item,basketIndex)">+添加用料</view>
					<view class="add-ingredient ingredient" @click="delIngredient">删除这个清单</view>
				</view>
				<view class="ingredient-list">
					<view class="ingredient-item">
						<radio-group>
							<view v-for="(ingredient, index) in item.ingredients" :key="ingredient.id" @click="editIngredientItem(ingredient)">
								<view class="radio-group" v-if="!ingredient.checked">
									<label @click="radioChange(ingredient)">
										<radio :value="ingredient.id" />
									</label>
									<view class="radio-group-info" >
										<view>{{ingredient.foodname}}</view>
										<view class="foodname">{{ingredient.amount?ingredient.amount:''}}{{ingredient.unit?ingredient.unit:''}}</view>
									</view>
								</view>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="title-state">已完成</view>
				<view class="ingredient-list">
					<view class="ingredient-item">
						<checkbox-group>
							<view v-for="(ingredient, index) in item.ingredients" :key="ingredient.id">
								<view class="radio-group" v-if="ingredient.checked">
									<label @click.stop="cancleRadioChange(ingredient)">
										<radio :value="ingredient.checked" :checked="ingredient.checked" />
									</label>
									<view class="radio-group-info">
										<view>{{ingredient.foodname}}</view>
										<view class="foodname">{{ingredient.amount?ingredient.amount:''}}{{ingredient.unit?ingredient.unit:''}}</view>
									</view>
								</view>
							</view>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :animation="true">
			<view class="popup-con">
				<view class="action-header">
					<view class="title">删除/编辑  用料</view>
					<view class="action">
						<view class="del">删除</view>
						<view class="save">完成</view>
						<view class="save" @click="save">保存</view>
					</view>
				</view>
				<view class="aciotn-con">
					<view class="item">
						<text class="item-name" >用料名</text>
						<input type="text" v-model="ingredient.foodname" class="edit-input" />
					</view>
					<view class="item">
						<text class="item-name" >数目|备注</text>
						<input type="text" v-model="ingredient.amount" class="edit-input" />
					</view>
					
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				basketList: [],
				ingredient:{
					foodname:'',
					amount:'',
					id:''
				},
				basketIndex:0
			}
		},
		components:{
			uniPopup
		},

		computed() {

		},
		onShow() {
			let basketLists = JSON.parse(uni.getStorageSync('ingredientLists')) || []
			for (let i = 0; i < basketLists.length; i++) {
				const ingredient = basketLists[i].ingredients
				for (let basket = 0; basket < basketLists[i].ingredients.length; basket++) {
					if (ingredient[basket].checked) {
						ingredient[basket].checked = true
					} else {
						basketLists[i].ingredients[basket].checked = false
					}
				}
			}
			this.basketList = basketLists
			console.log(this.basketList)
		},
		onHide() {
			console.log('onHide')
		},
		onUnload() {
			console.log('onUnload')
		},
		methods: {
			// 编辑食材
			editIngredientItem(type){
				this.$refs.popup.open('top')
			}
			// 添加食谱
			addIngredientItem(item,basketIndex) {
				this.ingredient.foodname = ''
				this.ingredient.amount = ''
				this.ingredient.id = ''
				this.basketIndex = basketIndex
				this.$refs.popup.open('top')
			},
			delIngredient() {},
			radioChange(ingredient) {
				console.log(ingredient)
				console.log(this)
				ingredient.checked = true
				uni.setStorageSync('ingredientLists', JSON.stringify(this.basketList))
			},
			cancleRadioChange(ingredient) {
				ingredient.checked = false
				uni.setStorageSync('ingredientLists', JSON.stringify(this.basketList))
			},
			// 保存时往当天菜谱的材料中新增食料
			save(){
				this.basketList[this.basketIndex].ingredients.unshift({
					...this.ingredient,
					id:new Date().getTime()
				})
				uni.setStorageSync('ingredientLists', JSON.stringify(this.basketList))
				this.$refs.popup.close()
			},
			// 编辑食材
			// editIngredientItem(ingredientItem){
			// 	// this.ingredient.foodname = ''
			// 	// this.ingredient.amount = ''
			// 	// this.ingredient.id = ''
			// 	console.log(ingredientItem)
			// 	this.$refs.popup.open('top')
			// 	this.ingredient = ingredientItem
			// }
		}

	}
</script>

<style lang='scss'>
	.basket {
		box-sizing: border-box;
		background: #f3f3f3;
	}

	.radio-group {
		display: flex;
		align-items: center;
		background: #f9f9f9;
		padding: 16rpx 10rpx;
		margin-top: 20rpx;
		font-size: 24rpx;
	}

	.radio-group-info {
		display: flex;
		text-align: center;
		width: 100%;

		.foodname {
			flex: 1;
			text-align: center;
			padding-right: 40rpx;
			width: 100%;
			font-size: 24rpx;
		}
	}

	.basket-content {
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		background: #fff;

		.basket-item {}

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				font-size: 28rpx;
			}

			.arrow {
				width: 60rpx;
			}
		}

		.action {
			display: flex;

			.ingredient {
				padding: 8rpx 14rpx;
				border-radius: 10rpx;
				border: 2rpx solid #ff5500;
				margin: 10rpx;
				font-size: 24rpx;
			}
		}

		.ingredient-list {
			.ingredient-item {}
		}
	}

	.uni-list-cell-pd {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f9f9f9;
		padding: 16rpx 10rpx;
		margin-top: 20rpx;
		font-size: 24rpx;
	}
	.popup-con{
		height: 80vh;
		background: #fff;
		width: 100%;
		padding: 20rpx;
		.action-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.action{
				display: flex;
				.del{
					margin: 0 10rpx;
				}
			}
		}
		.aciotn-con{
			padding-top: 20rpx;
			.item{
				display: flex;
				.edit-input{
					border-bottom: 2rpx solid #d6d7dc;
				}
				.item-name{
					width: 200rpx;
				}
			}
		}
	}
</style>
