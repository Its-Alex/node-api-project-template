import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { swaggerSpec, swaggerHandler } from '../swagger'

import { router as UserRoutes } from './user'

export const router = express()


router.use('/swagger.json', swaggerHandler())
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

router.use('/', UserRoutes)

router.use((_req: any, res: any) => {
  res.status(404).json({
    message: 'not found'
  })
})
