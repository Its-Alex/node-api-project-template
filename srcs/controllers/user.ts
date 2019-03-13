import Joi from 'joi'
import { logger } from '../logger'

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().alphanum().min(5).max(60).required()
})

/**
 * @swagger
 *
 * /card:
 *   post:
 *     description: Fake route
 *     summary: Return succes if validation is correct
 *     operationId: PostTestValidate
 */
export default async (req: any, res: any) => {
  try {
    await Joi.validate(req.body, schema, { abortEarly: false })

    res.json({
      message: 'validation success'
    })
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        message: 'validation error',
        errors: error.details
      })
    }
    
    logger.error(error)
    res.status(400).json({
      message: 'Internal server error'
    })
  }
}
