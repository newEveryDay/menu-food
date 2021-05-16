const Router = require("koa-router")
const { Auth } = require("../../../middleWares/auth")
const { menuValidator } = require("../../../validators/menu")
const { Menu, Step, Ingredient } = require("../../models/menu")
const { Success, NotFound } = require("../../../core/http-exception")
const {
  Sequelize,
  Model,
  Op
} = require('sequelize')
const router = new Router({
  prefix: '/v1/menu'
})
router.post('/addmMenu', async (ctx, next) => {
  const v = await new menuValidator().validate(ctx)
  const baseMenu = {
    categoryId: v.get('body.categoryId'),
    difficulty: v.get('body.difficulty'),
    menuName: v.get('body.menuName'),
    description: v.get('body.description')
  }
  try {
    const baseMenuRelsut = await Menu.create(baseMenu)
    const menuId = baseMenuRelsut.id
    const ingredient = v.get('body.ingredient').map((item) => {
      return {
        ...item,
        menuId
      }
    })
    const step = v.get('body.step').map((item) => {
      return {
        ...item,
        menuId
      }
    })
    const ingredientRelsut = await Ingredient.bulkCreate(ingredient)
    const stepRelsut = await Step.bulkCreate(step)
    const menu = {
      ...baseMenu,
      ingredientRelsut,
      stepRelsut
    }
    ctx.body = new Success('创建成功', menu)
  } catch (error) {
    console.log(error)
  }

})
// 修改菜谱详情
router.post('/updataMenu/:id', async (ctx, next) => {
  const id = ctx.params.id
  const menu = ctx.request.body
  const ingredient = menu.ingredient.map(item => {
    return {
      ...item,
      menuId: id
    }
  })
  const step = menu.step.map(item => {
    return {
      ...item,
      menuId: id
    }
  })
  try {
    const menuInfo = await Menu.update(menu, {
      where: {
        id
      }
    })
    const steps = await Step.bulkCreate(step, {
      updateOnDuplicate: ['desc', "update_time"]
    })
    const ingredients = await Ingredient.bulkCreate(ingredient, {
      updateOnDuplicate: ['foodname', "unit", "update_time"]
    })
    ctx.body = new Success('更新成功')
  } catch (error) {
    console.log(error)
  }

})
// 获取菜谱详情
router.get('/getMenuById/:id', async (ctx, next) => {
  const id = ctx.params.id
  const menu = await Menu.findOne({
    where: {
      id
    }
  })
  if (!menu) {
    throw new NotFound()
  }
  const steps = await Step.findAll({
    where: {
      menuId: id
    }
  })
  const ingredients = await Ingredient.findAll({
    where: {
      menuId: id
    }
  })
  menu.setDataValue('steps', steps)
  menu.setDataValue('ingredients', ingredients)
  ctx.body = new Success('创建成功', menu)
})
module.exports = router