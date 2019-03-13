import express from 'express'
import Joi from 'joi'

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
module.exports = async (req: express.Request, res: express.Response) => {
  try {
    await Joi.validate(req.body, schema, { abortEarly: false })

    res.json({
      message: 'success'
    })
  } catch (error) {
    res.status(400).json({
      message: 'validation error',
      errors: error.details
    })
  }
}
