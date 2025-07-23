const { errorResponse, successResponse } = require('../utils/response');
const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  if (!name) {
    errorResponse(res, 'Category name is required', 'Validation failed', 400);
  }

  try {
    const newCategory = new Category({
      name,
      description,
      createBy: userId
    });

    await newCategory.save();
    successResponse(res, newCategory, 'Category created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message, 'Failed to create category', 500);
  }
}

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;

  if (!name) {
    return errorResponse(res, 'Category name is required', 'Validation failed', 400);
  }

  try {
    const category = await Category.findById(id);
    if (!category) {
      return errorResponse(res, 'Category not found', 'Update failed', 404);
    }

    if (category.createBy.toString() !== userId.toString()) {
      return errorResponse(res, 'Unauthorized to update this category', 'Update failed', 403);
    }

    category.name = name;
    category.description = description || category.description;
    await category.save();

    successResponse(res, category, 'Category updated successfully');
  } catch (error) {
    errorResponse(res, error.message, 'Failed to update category', 500);
  }
}

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return errorResponse(res, 'Category not found', 'Delete failed', 404);
    }
    if (category.createBy.toString() !== userId.toString()) {
        errorResponse(res, 'Unauthorized to delete this category', 'Delete failed', 403);
    }
    await category.deleteOne();
    successResponse(res, null, 'Category deleted successfully', 204);
  } catch (error) {
    errorResponse(res, error.message, 'Failed to delete category', 500);
  }
}

exports.categoryList = async (req, res) => {
  const userId = req.user.id;

  try {
    const categories = await Category.find({ createBy: userId });
    successResponse(res, categories, 'Categories retrieved successfully');
  } catch (error) {
    errorResponse(res, error.message, 'Failed to retrieve categories', 500);
  }
}