import express from 'express'
export const router = express.Router()

router.post('/', require('../controllers/user'))