import express from 'express'
import Joi from 'joi'

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().alphanum().min(5).max(60).required(),
})

/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
module.exports = async (req: express.Request, res: express.Response) => {
  try {    
    await Joi.validate(req.body, schema, { abortEarly: false })

    if (!(req.body.username === 'Alex' && req.body.password === '123456')) {
      return res.status(400).json({
        message: 'bad username or bad password'
      })
    }

    res.json({
      message: 'Logged'
    })
  } catch (error) {
    res.status(400).json({
      message: 'validation error',
      errors: error.details
    })
  }
}