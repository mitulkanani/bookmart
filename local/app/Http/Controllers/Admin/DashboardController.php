<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Session;
use App\Http\Requests\adminAddProductRequest;
use Input;
use Auth;
use Config;
use Redirect;
use Image;
use Validator;
use File;
use App\UploadImage;
use Response;
use App\User;
use App\CartProduct;
use App\Transport;
use App\BookMart;

class DashboardController extends Controller {

    public function __construct() {
        $this->middleware('auth.adminOnly');
        $this->userOBJ = new User();
        $this->cartproductOBJ = new CartProduct();
        $this->bookmartOBJ = new BookMart();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $users = $this->userOBJ->getUserList();
        return view('admin.home', compact('users'));
    }

    public function admin_cart_product() {
        $cart_products = $this->cartproductOBJ->getProductListForAdmin();
        return view('admin.cartproduct.admin_cart_product', compact('cart_products'));
    }

    public function admin_book_mart() {
        $book_mart_products = $this->bookmartOBJ->getbookmartListForAdmin();
        return view('admin.bookmart.admin_book_mart', compact('book_mart_products'));
    }

    public function add_cart_product() {
        $cart_product = array();
        $categories = $this->cartproductOBJ->getcategoryListForAdmin();
        return view('admin.cartproduct.add_admin_cart_product', compact('cart_product', 'categories'));
    }

    public function edit_admin_cart_product($productId) {
        $cart_product = CartProduct::find($productId);
        $categories = $this->cartproductOBJ->getcategoryListForAdmin();
        return view('admin.bookmart.add_admin_cart_product', compact('cart_product', 'categories'));
    }

    public function admin_cart_productsave(Request $request) {
        $cart_product_id = Input::get('cart_product_id');
        $cat_id = Input::get('cat_id');
        $full_name = Input::get('full_name');
        $sale_rent = e(Input::get('sale_rent'));
        $front_big_img = Input::file('front_big_img');
        $price = e(Input::get('price'));
        $discounts = e(Input::get('discounts'));
        $shippingCost = e(Input::get('shippingCost'));
        $description = e(Input::get('description'));
        $status = e(Input::get('status'));
        $rules = array(
            'full_name' => 'required',
            'sale_rent' => 'required',
        );
        $input = Input::get();
        $validation = Validator::make($input, $rules);

        //For image save
        $pathoriginal = 'admin_cart_picture/original/';
        $path50 = 'admin_cart_picture/thumbnail/';
        $images = Input::file('images');
        $i = 0;
        if (Input::hasFile('images')) {
            foreach ($images as $key => $image) {
                $extension = $image->getClientOriginalExtension(); // getting image extension
                $fileName = time() . $i . '.' . $extension; // renameing image
                $image->move($pathoriginal, $fileName); // uploading file to given path
                File::copy($pathoriginal . $fileName, $path50 . $fileName);
                Image::make($path50 . $fileName)
                        ->resize('70', '70')
                        ->save($path50 . $fileName);
                $i++;
                $img[] = $fileName;
            }
            $other_images = implode(',', $img);
        } else {
            $other_images = "";
        }
        if ($validation->fails()) {
            return Redirect::to("admin/add_cart_product")->withErrors($validation);
        } else {
            if ($cart_product_id > 0) {
                $cart_product = CartProduct::find($cart_product_id);
                $cart_product->cat_id = $cat_id;
                $cart_product->full_name = $full_name;
                $cart_product->name = $full_name;
                $cart_product->sale_rent = $sale_rent;
                $cart_product->front_big_img = $front_big_img;
                $cart_product->image_cart = $front_big_img;
                $cart_product->price = $price;
                $cart_product->discounts = $discounts;
                $cart_product->shippingCost = $shippingCost;
                $cart_product->description = $description;
                $cart_product->other_images = $other_images;
                $cart_product->status = $status;
                $cart_product->save();
                if ($cart_product) {
                    return Redirect::to("admin/admin_cart_product")->with('success', 'Product edited successfully');
                }
            } else {
                $front_extension = $front_big_img->getClientOriginalExtension(); // getting image extension
                $front_fileName = time() . 'front' . '.' . $front_extension; // renameing image

                Input::file('front_big_img')->move($pathoriginal, $front_fileName);

                File::copy($pathoriginal . $front_fileName, $path50 . $front_fileName);
                Image::make($path50 . $front_fileName)
                        ->resize('70', '70')
                        ->save($path50 . $front_fileName);

                $cart_product_list = CartProduct::create(array(
                            'cat_id' => $cat_id,
                            'full_name' => $full_name,
                            'name' => $full_name,
                            'sale_rent' => $sale_rent,
                            'front_big_img' => $front_fileName,
                            'image_cart' => $front_fileName,
                            'price' => $price,
                            'discounts' => $discounts,
                            'shippingCost' => $shippingCost,
                            'description' => $description,
                            'other_images' => $other_images,
                            'status' => $status,
                ));
                if ($cart_product_list) {
                    return Redirect::to("admin/admin_cart_product")->with('success', 'Product added successfully');
                }
            }
        }
    }

    public function delete_admin_cart_product($cart_product_id) {
        $product = CartProduct::find($cart_product_id)->delete();
        return Redirect::to("admin/admin_cart_product")->with('success', 'Product deleted successfully');
    }

    public function view_cart_product($cart_product_id) {
        $cart_product = CartProduct::find($cart_product_id);
        return view("admin.cartproduct.view_cart_product", compact('cart_product'));
    }

    /**
     *  For admin Book mart
     *
     * @return Response
     */
    public function add_admin_book_mart() {
        $book_mart = array();
        return view('admin.bookmart.add_admin_book_mart', compact('book_mart'));
    }

    public function edit_admin_book_mart($bookId) {
        $book_mart = BookMart::find($bookId);
        return view('admin.bookmart.add_admin_book_mart', compact('book_mart'));
    }

    public function admin_book_mart_productsave(Request $request) {
        $book_mart_id = Input::get('book_mart_id');
        $category = Input::get('category');
        $ad_title = Input::get('ad_title');
        $ad_type = Input::get('ad_type');
        $author_name = e(Input::get('author_name'));
        $publication = e(Input::get('publication'));
        $edition = e(Input::get('edition'));
        $price = e(Input::get('price'));
        $college = e(Input::get('college'));
        $address = e(Input::get('address'));
        $city = e(Input::get('city'));
        $mobileno = e(Input::get('mobileno'));
        $password = e(Input::get('password'));
        $owner_name = e(Input::get('owner_name'));
        $cover_image = Input::file('cover_image');
        $fixed = e(Input::get('fixed'));
        $description = e(Input::get('description'));
        $status = e(Input::get('status'));
        $rules = array(
            'ad_title' => 'required',
            'price' => 'required',
            'college' => 'required',
            'mobileno' => 'required',
            'password' => 'required',
            'owner_name' => 'required',
        );
        $input = Input::get();
        $validation = Validator::make($input, $rules);

        //For image save
        $pathoriginal = 'ads_picture/book_mart/original/';
        $path50 = 'ads_picture/book_mart/thumbnail/';
        $images = Input::file('images');
        $i = 0;
        if (Input::hasFile('images')) {
            foreach ($images as $key => $image) {
                $extension = $image->getClientOriginalExtension(); // getting image extension
                $fileName = time() . $i . '.' . $extension; // renameing image
                $image->move($pathoriginal, $fileName); // uploading file to given path
                File::copy($pathoriginal . $fileName, $path50 . $fileName);
                Image::make($path50 . $fileName)
                        ->resize('70', '70')
                        ->save($path50 . $fileName);
                $i++;
                $img[] = $fileName;
            }
            $other_images = implode(',', $img);
        } else {
            $other_images = "";
        }
        if ($validation->fails()) {
            return Redirect::to("admin/add_cart_product")->withErrors($validation);
        } else {
            if ($book_mart_id > 0) {
                $front_extension = $cover_image->getClientOriginalExtension(); // getting image extension
                $cover_image_fileName = time() . 'front' . '.' . $front_extension; // renameing image


                Input::file('cover_image')->move($pathoriginal, $cover_image_fileName);

                File::copy($pathoriginal . $cover_image_fileName, $path50 . $cover_image_fileName);
                Image::make($path50 . $cover_image_fileName)
                        ->resize('70', '70')
                        ->save($path50 . $cover_image_fileName);
                
                $book_mart = BookMart::find($book_mart_id);
                $book_mart->category = $category;
                $book_mart->ad_title = $ad_title;
                $book_mart->ad_type = $ad_type;
                $book_mart->author_name = $author_name;
                $book_mart->publication = $publication;
                $book_mart->edition = $edition;
                $book_mart->college = $college;
                $book_mart->price = $price;
                $book_mart->address = $address;
                $book_mart->city = $city;
                $book_mart->mobileno = $mobileno;
                $book_mart->password = $password;
                $book_mart->owner_name = $owner_name;
                $book_mart->cover_image = $cover_image_fileName;
                $book_mart->fixed = $fixed;
                $book_mart->description = $description;
                $book_mart->other_images = $other_images;
                $book_mart->status = $status;
                $book_mart->save();
                if ($book_mart) {
                    return Redirect::to("admin/admin_book_mart")->with('success', 'Product edited successfully');
                }
            } else {
                $front_extension = $cover_image->getClientOriginalExtension(); // getting image extension
                $cover_image_fileName = time() . '_cover' . '.' . $front_extension; // renameing image


                Input::file('cover_image')->move($pathoriginal, $cover_image_fileName);

                File::copy($pathoriginal . $cover_image_fileName, $path50 . $cover_image_fileName);
                Image::make($path50 . $cover_image_fileName)
                        ->resize('70', '70')
                        ->save($path50 . $cover_image_fileName);

                $book_mart_list = BookMart::create(array(
                            'category' => $category,
                            'ad_title' => $ad_title,
                            'ad_type' => $ad_type,
                            'author_name' => $author_name,
                            'publication' => $publication,
                            'edition' => $edition,
                            'college' => $college,
                            'price' => $price,
                            'address' => $address,
                            'city' => $city,
                            'mobileno' => $mobileno,
                            'password' => $password,
                            'owner_name' => $owner_name,
                            'cover_image' => $cover_image,
                            'fixed' => $fixed,
                            'description' => $description,
                            'other_images' => $other_images,
                            'status' => $status,
                ));
                if ($book_mart_list) {
                    return Redirect::to("admin/admin_book_mart")->with('success', 'Product added successfully');
                }
            }
        }
    }

    public function delete_admin_book_mart($book_id) {
        $book_mart = BookMart::find($book_id)->delete();
        return Redirect::to("admin/admin_book_mart")->with('success', 'Product deleted successfully');
    }

    public function view_admin_book_mart($book_id) {
        $book_details = BookMart::find($book_id);
        return view("admin.bookmart.view_admin_book_mart", compact('book_details'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store() {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        //
    }

    public function dashboard() {
        return view('admin.dashboard.dashboard');
    }

}
