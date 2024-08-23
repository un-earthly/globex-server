const express = require('express');

const router = express.Router();

const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const { getProductController, getDealOfTheDayController, searchProductController, deleteProductController } = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const { getCategoryWiseProduct, getSubcategoryItems } = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const filterProductController = require('../controller/product/filterProduct');
const { getAllOrdersController, getOrderDetailsController, getAllOrdersAdminController, searchOrdersController, updateOrderStatusController } = require('../controller/cart/getAllCartController');
const {
	addCategory,
	updateCategory,
	updateSubcategory,
	deleteCategory,
	deleteSubcategory,
	addSubcategory,
} = require('../controller/category/createCategoryController');
const { getAllCategories } = require('../controller/category/getAllCategoriesController');
const checkoutController = require('../controller/cart/cartController');

router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', userLogout);

//admin panel
router.get('/all-user', authToken, allUsers);
router.post('/update-user', authToken, updateUser);

//category
router.post('/add-category', addCategory);
router.post('/add-subcategory', addSubcategory);
router.get('/categories', getAllCategories);
router.put('/categories/:id', updateCategory);
router.put('/categories/:categoryId/subcategories/:subcategoryId', updateSubcategory);
router.delete('/delete-category/:id', deleteCategory);
router.delete('/delete-subcategory/:categoryId/:subcategoryId', deleteSubcategory);


//product
router.post('/upload-product', authToken, UploadProductController);
router.get('/get-product', getProductController);
router.get('/deal-of-the-day', getDealOfTheDayController);
router.post('/update-product', authToken, updateProductController);
router.get('/get-categoryProduct', getCategoryProduct);
router.post('/category-product', getCategoryWiseProduct);
router.post('/sub-category-product', getSubcategoryItems);
router.post('/product-details', getProductDetails);
router.get('/search', searchProductController);
router.post('/filter-product', filterProductController);

//user add to cart
router.post('/checkout', authToken, checkoutController);
router.get('/get-all-orders', authToken, getAllOrdersController);
router.get('/get-admin-orders', getAllOrdersAdminController);
router.put('/admin/orders/:orderId/status', updateOrderStatusController);
router.get('/admin/orders/search', searchOrdersController);
router.get('/get-order/:id', authToken, getOrderDetailsController);
router.get('/countAddToCartProduct', authToken, countAddToCartProduct);
router.delete('/delete-product/:id', deleteProductController);
// router.put('/update-product/:id', updateProductController);

// router.get('/view-card-product', authToken, addToCartViewProduct);
// router.post('/update-cart-product', authToken, updateAddToCartProduct);
// router.post('/delete-cart-product', authToken, deleteAddToCartProduct);

module.exports = router;
