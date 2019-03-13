import express from 'express'
export const router = express.Router()

import userController from '../controllers/user'

router.post('/', userController)
