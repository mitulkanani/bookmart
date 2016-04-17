<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */


//For front
Route::get('/', 'HomeController@index');
Route::get('book_mart', 'HomeController@book_mart');
Route::get('transport', 'HomeController@transport');
Route::post('/gallery', 'HomeController@gallery');
Route::post('/view_full_detail', 'HomeController@view_full_detail');
Route::get('/post_ad', 'HomeController@post_ad');
Route::post('adSave', 'HomeController@adSave');
Route::post('search_book', 'HomeController@search_book');
Route::post('get_authors', 'HomeController@get_authors');
Route::post('searchAjax', 'HomeController@searchAjax');
Route::post('searchAdtitle', 'HomeController@searchAdtitle');
Route::get('how_it_works', 'HomeController@how_it_works');
Route::get('open_store', 'HomeController@open_store');
Route::post('more_content', 'HomeController@more_content');

//cart
Route::post('rand', 'ProductController@addsuccess');
Route::get('view_full_details/{id}', 'ProductController@viewProductDetails');
Route::get('book-mart', 'ProductController@viewPage');
Route::post('view_product', 'ProductController@view_product');

//For admin
Route::get('signup', 'UserController@signup');
Route::post('/user/save', 'UserController@saveUser');
Route::get('profile', 'UserController@profile');
Route::get('login', 'UserController@login');
Route::post('logincheck', 'UserController@loginCheck');

/*
  Route::get('home', 'HomeController@index');
 */
Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);

// For Transport Module
Route::get('admin/admin_product', 'Admin\TransportController@product');
Route::get('/admin/addproduct', 'Admin\TransportController@addproduct');
Route::post('/admin/admin_productsave', 'Admin\TransportController@saveproduct');
Route::post('/deleteImage', 'Admin\TransportController@deleteImage');
Route::post('imageSave/{product_id}', 'Admin\TransportController@imageSave');
Route::get('/admin/editAdmin_product/{product_id}', 'Admin\TransportController@editAdmin_product');
Route::get('/admin/deleteAdmin_product/{product_id}', 'Admin\TransportController@deleteAdmin_product');
Route::get('admin/properties/{user_id}', 'Admin\TransportController@getPropertyDetails');

// For All Cart Product Module
Route::get('admin/admin_cart_product', 'Admin\DashboardController@admin_cart_product');
Route::get('/admin/add_cart_product', 'Admin\DashboardController@add_cart_product');
Route::post('/admin/admin_cart_productsave', 'Admin\DashboardController@admin_cart_productsave');
Route::get('/admin/edit_admin_cart_product/{product_id}', 'Admin\DashboardController@edit_admin_cart_product');
Route::get('/admin/delete_admin_cart_product/{product_id}', 'Admin\DashboardController@delete_admin_cart_product');
Route::get('admin/view_cart_product/{id}', 'Admin\DashboardController@view_cart_product');

// For All Book  martt Module
Route::get('admin/admin_book_mart', 'Admin\DashboardController@admin_book_mart');
Route::get('/admin/add_admin_book_mart', 'Admin\DashboardController@add_admin_book_martt');
Route::post('/admin/admin_book_mart_productsave', 'Admin\DashboardController@admin_book_mart_productsave');
Route::get('/admin/edit_admin_book_mart/{product_id}', 'Admin\DashboardController@edit_admin_book_mart');
Route::get('/admin/delete_admin_book_mart/{product_id}', 'Admin\DashboardController@delete_admin_book_mart');
Route::get('admin/view_admin_book_mart/{id}', 'Admin\DashboardController@view_admin_book_mart');

// For CMS Module
Route::get('admin/cms', 'Admin\CmsController@cms');
Route::get('/admin/addcms', 'Admin\CmsController@addcms');
Route::post('/admin/cmssave', 'Admin\CmsController@saveCms');
Route::get('/admin/editcms/{cms_id}', 'Admin\CmsController@editCms');
Route::get('/admin/deletecms/{cms_id}', 'Admin\CmsController@deleteCms');
Route::get('admin/cms/{cms_id}', 'Admin\CmsController@getCmsDetails');

// Routes rules for Admin panel
Route::get('admin', ['middleware' => 'auth.adminOnly', 'uses' => 'Admin\AdminController@adminLogin']);
Route::post('admin/logincheck', 'Admin\AdminController@loginCheck');
Route::get('admin/dashboard', 'Admin\DashboardController@index');
Route::get('admin/users/{user_id}', 'Admin\UsersController@getUserDetails');
Route::get('/admin/logout', 'Admin\AdminController@getLogout');
Route::get('/admin/adduser', 'Admin\UsersController@addUser');
Route::post('/admin/usersave', 'Admin\UsersController@saveUser');
Route::get('/admin/edituser/{user_id}', 'Admin\UsersController@editUser');
Route::get('/admin/uploadImage/{property_id}', 'Admin\TransportController@uploadImage');
Route::get('/admin/deleteuser/{user_id}', 'Admin\UsersController@deleteUser');


// Display all SQL executed in Eloquent
//Event::listen('illuminate.query', function($query)
//{
  //  var_dump($query);
//});


