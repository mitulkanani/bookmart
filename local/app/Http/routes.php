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
Route::post('/post_ad', 'HomeController@post_ad');
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

// For Property Module
Route::get('admin/property', 'Admin\PropertyController@property');
Route::get('/admin/addproperty', 'Admin\PropertyController@addproperty');
Route::post('/admin/propertysave', 'Admin\PropertyController@saveProperty');
Route::post('/deleteImage', 'Admin\PropertyController@deleteImage');
Route::post('imageSave/{property_id}', 'Admin\PropertyController@imageSave');
Route::get('/admin/editproperty/{property_id}', 'Admin\PropertyController@editProperty');
Route::get('/admin/deleteproperty/{property_id}', 'Admin\PropertyController@deleteProperty');
Route::get('admin/properties/{user_id}', 'Admin\PropertyController@getPropertyDetails');

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
Route::get('admin/admin_product', 'Admin\DashboardController@admin_product');
Route::get('admin/users/{user_id}', 'Admin\UsersController@getUserDetails');
Route::get('/admin/logout', 'Admin\AdminController@getLogout');
Route::get('/admin/adduser', 'Admin\UsersController@addUser');
Route::get('/admin/addproduct', 'Admin\UsersController@addProduct');
Route::post('/admin/usersave', 'Admin\UsersController@saveUser');
Route::get('/admin/edituser/{user_id}', 'Admin\UsersController@editUser');
Route::get('/admin/uploadImage/{property_id}', 'Admin\PropertyController@uploadImage');
Route::get('/admin/deleteuser/{user_id}', 'Admin\UsersController@deleteUser');


// Display all SQL executed in Eloquent
//Event::listen('illuminate.query', function($query)
//{
  //  var_dump($query);
//});


