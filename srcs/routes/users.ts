import express from 'express'
const router = express.Router();

router.post('/', require('../controllers/users'))

module.exports = router
