class Basket {
	// 添加食材到菜篮子中
	static addIngredientsTobasket(menuDetail) {
		const ingredientListInfo = uni.getStorageSync('ingredientLists') || []
		const ingredientLists = ingredientListInfo.length > 0 ? JSON.parse(ingredientListInfo) : []
		if (ingredientLists) {
			ingredientLists.push(menuDetail)
		} else {
			ingredientLists = [menuDetail]
		}
		// 获取食材信息
		uni.setStorageSync('ingredientLists', JSON.stringify(ingredientLists));
		uni.showToast({
			title: '添加菜篮子成功'
		})
	}
	
	// 移除到菜篮子
	static dorpIngredientsFrombasket(id){
		const ingredientListInfo = JSON.parse(uni.getStorageSync('ingredientLists')) || []
		for(let i =0 ;i<ingredientListInfo.length;i++){
			if(ingredientListInfo[i].id===+id){
				ingredientListInfo.splice(i,1)
				break
			}
		} 
		uni.setStorageSync('ingredientLists', JSON.stringify(ingredientListInfo));
		uni.showToast({
			title: '移除菜篮子成功'
		})
	}
}

export  {
	Basket
}
