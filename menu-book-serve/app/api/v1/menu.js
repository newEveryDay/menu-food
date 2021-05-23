const Router = require("koa-router")
const { Auth } = require("../../../middleWares/auth")
const { menuValidator } = require("../../../validators/menu")
const { Menu, Step, Ingredient } = require("../../models/menu")
const { Success, NotFound } = require("../../../core/http-exception")
const {
  Sequelize,
  Model,
  Op,
  JSON
} = require('sequelize')
const router = new Router({
  prefix: '/v1/menu'
})
router.post('/addmMenu', async (ctx, next) => {
  const v = await new menuValidator().validate(ctx)
  console.log(ctx.request.body)
  const image = v.get('body.img').map((item) => {
    return item.img
  }).join()
  console.log('111', image)
  const baseMenu = {
    categoryId: v.get('body.categoryId'),
    difficulty: v.get('body.difficulty'),
    menuName: v.get('body.menuName'),
    img: image,
    description: v.get('body.description')
  }
  try {
    const baseMenuRelsut = await Menu.create(baseMenu)
    const menuId = baseMenuRelsut.id
    const ingredient = v.get('body.ingredients').map((item) => {
      return {
        ...item,
        menuId
      }
    })
    const step = v.get('body.steps').map((item) => {
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
  const image = menu.img.map((item) => {
    return item.img
  }).join()

  const baseMenu = {
    ...menu,
    img: image
  }


  const ingredient = menu.ingredients.map(item => {
    return {
      ...item,
      menuId: id
    }
  })
  const step = menu.steps.map(item => {
    return {
      ...item,
      menuId: id
    }
  })
  try {
    const menuInfo = await Menu.update(baseMenu, {
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

// 查询商品列表
router.get('/getMenuList', async (ctx, next) => {
  let { page = 1, size = 10, title = '', id = '' } = ctx.request.query
  console.log(ctx.request.query)

  let offset = (parseInt(page) - 1) * parseInt(size)
  const menuListCout = await Menu.findAndCountAll({
    where: {
      // name: 'cheny', // 精确查询
      menuName: {
        // 模糊查询
        [Op.like]: '%' + title + '%'
      },
      categoryId: id
    }
  })
  const totalCout = menuListCout.count
  const menuList = await Menu.findAll({
    where: {
      // name: 'cheny', // 精确查询
      menuName: {
        // 模糊查询
        [Op.like]: '%' + title + '%',

      },
      categoryId: id
    },
    include: [
      {
        model: Step,
        as: "steps",
        required: true
      },
      {
        model: Ingredient,
        as: "ingredients",
        required: true
      }
    ],
    offset,
    limit: parseInt(size)
  })
  let restult = {
    data: menuList,
    page,
    size,
    totalCout: totalCout
  }
  // menuList.setDataValue("pageInfo", totalCout)
  ctx.body = new Success('查询列表成功', restult)
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