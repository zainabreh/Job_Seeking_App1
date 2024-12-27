import express from 'express'
import { createCategory, deleteCategory, getCategoryById, gettAllCategory } from '../controller/category.controller.js'

const router = express.Router()

router.route('/category/all').get(gettAllCategory)
router.route('/category/single/:id').get(getCategoryById)
router.route('/category/new').post(createCategory)
router.route('/category/delete').delete(deleteCategory)


export default router