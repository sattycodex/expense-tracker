const express = require('express');
const {categoryList, createCategory, updateCategory, deleteCategory} = require('../controller/category.controller');


const router = express.Router();

router.post('/create-category', createCategory);
router.get('/list-category', categoryList);
router.put('/update-category/:id', updateCategory);
router.delete('/delete-category/:id', deleteCategory);

module.exports = router;