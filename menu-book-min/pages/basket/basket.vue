<template>
	<view class="basket">
		<view class="basket-content">
			<view class="basket-item" v-for="(item) in basketList" :key='item.id'>
				<view class="header">
					<view class="title">{{item.menuName}}</view>
					<view class="arrow">></view>
				</view>
				<view class="action">
					<view class="add-ingredient ingredient" @click="addIngredientItem">+添加用料</view>
					<view class="add-ingredient ingredient" @click="delIngredient">删除这个清单</view>
				</view>
				<view class="ingredient-list">
					<view class="ingredient-item">
						<radio-group>
							<view v-for="(ingredient, index) in item.ingredients" :key="ingredient.id">
								<label class="uni-list-cell uni-list-cell-pd" v-if="!ingredient.checked" @click="radioChange(ingredient)">
									<view>
										<radio :value="ingredient.id" />
									</view>
									<view>{{ingredient.foodname}}</view>
									<view class="foodname">{{ingredient.amount + ingredient.unit}}</view>
								</label>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="title-state">已完成</view>
				<view class="ingredient-list">
					<view class="ingredient-item">
						<checkbox-group>
							<view v-for="(ingredient, index) in item.ingredients" :key="ingredient.id">
								<label class="uni-list-cell uni-list-cell-pd" v-if="ingredient.checked" @click="cancleRadioChange(ingredient)">
									<view>
										<radio :value="ingredient.checked" :checked="ingredient.checked" />
									</view>
									<view>{{ingredient.foodname}}</view>
									<view class="foodname">{{ingredient.amount + ingredient.unit}}</view>
								</label>
							</view>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				basketList: []
			}
		},

		computed() {

		},
		onShow() {
			let basketLists = JSON.parse(uni.getStorageSync('ingredientLists')) || [];
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
			// 添加食谱
			addIngredientItem() {},
			delIngredient() {},
			radioChange(ingredient) {
				ingredient.checked = true
				console.log(this.basketList)
				uni.setStorageSync('ingredientLists', JSON.stringify(this.basketList))
			},
			cancleRadioChange(ingredient) {
				ingredient.checked = false
				uni.setStorageSync('ingredientLists', JSON.stringify(this.basketList))
			}
		}

	}
</script>

<style lang='scss'>
	.basket {
		box-sizing: border-box;
		background: #f3f3f3;
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

			;

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

		.foodname {
			flex: 1;
			text-align: center;
			padding-right: 40rpx;
			font-size: 24rpx;
		}
	}
</style>
