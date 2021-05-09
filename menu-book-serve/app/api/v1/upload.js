const Router = require("koa-router")
const { Success } = require("../../../core/http-exception")
const { upload } = require('../../../core/upload')
const router = new Router({
  prefix: '/v1/upload'
})
router.post('/', upload.single('file'), async (ctx, next) => {
  const file = ctx.req.file
  const fileUrl = file.path.replace(/\\/g, '/')
  console.log(file)
  ctx.body = new Success('创建成功', {
    fileUrl
  })
})

module.exports = router