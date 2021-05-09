const Router = require("koa-router")
const { Auth } = require("../../../middleWares/auth")
const { menuValidator } = require("../../../validators/menu")
const { Menu, Step, Ingredient } = require("../../models/menu")
const { Success } = require("../../../core/http-exception")
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
    const ingredient =v.get('body.ingredient').map((item)=>{
      return {
        ...item,
        menuId
      }
    })
    const step =v.get('body.step').map((item)=>{
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
router.get('/getMenu', async (ctx, next) => {
  const category = await Menu.getCategory()
  ctx.body = new Success('创建成功', category)
})
module.exports = router