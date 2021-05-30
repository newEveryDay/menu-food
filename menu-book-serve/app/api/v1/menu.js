const Router = require("koa-router")
const { Auth } = require("../../../middleWares/auth")
const { menuValidator, menuIdValidator } = require("../../../validators/menu")
const { Menu, Step, Ingredient } = require("../../models/menu")
const { Success, NotFound } = require("../../../core/http-exception")
const { Collect } = require("../../models/collect")
const { CollectValidator } = require("../../../validators/collect")

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
  console.log(id)
  let queryCriteria = {}
  if (title && id) {
    queryCriteria = {
      [Op.and]: [
        {
          menuName: {
            // 模糊查询
            [Op.like]: '%' + title + '%',

          },
        },
        { categoryId: id }
      ]
    }
  } else if (title) {
    queryCriteria = {
      menuName: {
        // 模糊查询
        [Op.like]: '%' + title + '%',

      }
    }
  } else if (id) {
    queryCriteria = { categoryId: id }
  } else {
    queryCriteria = {}
  }
  const menuListCout = await Menu.findAndCountAll({
    where: queryCriteria
  })



  const totalCout = menuListCout.count
  const menuList = await Menu.findAll({
    where: queryCriteria,
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

// // 获取用户收藏
router.get('/collect', new Auth().m, async ctx => {
  const menuLists = await Collect.getMyMenuCollect(ctx.auth.uid)
  ctx.body = new Success("收藏列表", menuLists)
})
// 获取菜谱下的收藏信息
router.get('/:MenuId/collect', new Auth().m, async ctx => {
  const v = await new CollectValidator().validate(ctx, {
    id: 'menuId'
  })
  const collect = await Collect.getMenuCollect(
    v.get('path.MenuId'), ctx.auth.uid)
  ctx.body = new Success('获取用户收藏信息', collect)
})
// 添加浏览量
router.get('/:MenuId/pageViewNum', new Auth().m, async ctx => {
  const v = await new menuIdValidator().validate(ctx, {
    id: 'menuId'
  })
  console.log(v.get('path.MenuId'))
  await Menu.addPageViewNum(v.get('path.MenuId'))
  const restult = await Menu.findOne({
    where: {
      id: v.get('path.MenuId')
    }
  })
  ctx.body = new Success('获取浏览记录', restult)
})
module.exports = router